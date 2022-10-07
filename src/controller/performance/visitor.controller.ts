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
} from '../../service/performance/visitor.service';

export async function createVisitorHandler(
    req: Request<CreateVisitorInput>,
    res: Response
) {
    const userId = res.locals.user._id;

    const body = req.body;

    const visitor = await createVisitor({ ...body, user: userId });

    return res.send(visitor);
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
