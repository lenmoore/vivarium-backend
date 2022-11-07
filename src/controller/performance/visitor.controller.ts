import { Request, Response } from 'express';
import {
    CreateVisitorInput,
    DeleteVisitorInput,
    ReadVisitorInput,
    UpdateVisitorInput,
} from '../../schema/performance/visitor.schema';
import {
    createVisitor,
    deleteVisitor,
    findAndUpdateVisitor,
    findVisitor,
    getAllVisitors,
} from '../../service/performance/visitor.service';
import { createUser } from '../../service/user.service';
import {
    createSession,
    signAccessToken,
    signRefreshToken,
    signVisitorAccessToken,
} from '../../service/auth.service';
import { createBasket } from '../../service/humanity-shop/basket.service';
import { findPerformance } from '../../service/performance/performance.service';

export async function createVisitorHandler(
    req: Request<CreateVisitorInput>,
    res: Response
) {
    try {
        const user = await createUser({
            name: req.body.username,
            password: req.body.wardrobe_number,
            passwordConfirmation: req.body.wardrobe_number,
            email: req.body.email || '',
        });

        // sign an access token for the visitor; this is a default 1 day length token
        const accessToken = await signVisitorAccessToken(user);
        if (accessToken) {
            res.setHeader('x-access-token', accessToken);
        }

        const userId = user.id;

        const body = req.body;

        const visitor = await createVisitor({ ...body, user: userId });
        const visitorBasket = await createBasket({
            user: user,
            visitor: visitor,
            coins_left: 100,
            products: [],
        });
        const performance = await findPerformance({
            performanceId: body.performance,
        });
        await findAndUpdateVisitor(
            { visitorId: visitor._id },
            {
                basket: visitorBasket,
                performance: performance,
            },
            {
                new: true,
            }
        );

        visitor.accessToken = accessToken; // just in case
        return res.send(visitor);
    } catch (e) {
        console.error(e);
    }
}

export async function updateVisitorHandler(
    req: Request<UpdateVisitorInput['params']>,
    res: Response
) {
    const userId = res.locals.user._id;

    const visitorId = req.params.visitorId;
    const update = req.body;

    const visitor = await findVisitor({ visitorId });

    if (!visitor) {
        return res.sendStatus(404);
    }

    if (String(visitor.user) !== userId) {
        return res.sendStatus(403);
    }

    const updatedVisitor = await findAndUpdateVisitor({ visitorId }, update, {
        new: true,
    });

    return res.send(updatedVisitor);
}

export async function getVisitorHandler(
    req: Request<ReadVisitorInput['params']>,
    res: Response
) {
    const visitorId = req.params.visitorId;
    const visitor = await findVisitor({ visitorId });

    if (!visitor) {
        return res.sendStatus(404);
    }

    return res.send(visitor);
}

export async function getVisitorsHandler(req: Request, res: Response) {
    const visitors = await getAllVisitors();
    if (!visitors) {
        return res.sendStatus(404);
    }
    return res.send(visitors);
}

export async function deleteVisitorHandler(
    req: Request<DeleteVisitorInput['params']>,
    res: Response
) {
    const userId = res.locals.user._id;
    const visitorId = req.params.visitorId;

    const visitor = await findVisitor({ visitorId });

    if (!visitor) {
        return res.sendStatus(404);
    }

    if (String(visitor.user) !== userId) {
        return res.sendStatus(403);
    }

    await deleteVisitor({ visitorId });

    return res.sendStatus(200);
}
