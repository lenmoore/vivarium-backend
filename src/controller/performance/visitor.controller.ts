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
import {
    findAndUpdatePerformance,
    findPerformance,
} from '../../service/performance/performance.service';
import QuizResultModel from '../../models/performance/quiz-results.model';
import quizResultsModel from '../../models/performance/quiz-results.model';

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
            confirmed: false,
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
        await findAndUpdatePerformance(
            { performanceId: body.performance },
            { visitors: [...performance.visitors, visitor._id] },
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
    try {
        const visitorId = req.params.visitorId;
        const update = req.body;

        const visitor = await findVisitor({ visitorId });

        if (!visitor) {
            return res.sendStatus(404);
        }

        const quizResultsForUpdate = [];
        if (update.quiz_results) {
            const quizResults = update.quiz_results;
            for (const qr of quizResults) {
                if (qr._id == null) {
                    const createPayload = {
                        ...qr,
                        result_text: qr.result_text,
                        result_humanity_values: {
                            green: parseInt(qr.result_humanity_values.green),
                            fuchsia: parseInt(
                                qr.result_humanity_values.fuchsia
                            ),
                            blue: parseInt(qr.result_humanity_values.blue),
                            orange: parseInt(qr.result_humanity_values.orange),
                        },
                    };

                    const result = await QuizResultModel.create(createPayload);
                    quizResultsForUpdate.push(result._id);
                } else {
                    const result = await QuizResultModel.findByIdAndUpdate(qr);
                    quizResultsForUpdate.push(result._id);
                }
            }
        }
        update.quiz_results = quizResultsForUpdate;
        console.log(update);
        const updatedVisitor = await findAndUpdateVisitor(
            { visitorId },
            update,
            {
                new: true,
            }
        );

        return res.send(updatedVisitor);
    } catch (e) {
        console.error(e);
        return res.sendStatus(400);
    }
}

export async function getVisitorHandler(
    req: Request<ReadVisitorInput['params']>,
    res: Response
) {
    try {
        const visitorId = req.params.visitorId;
        const visitor = await findVisitor({ visitorId });

        if (!visitor) {
            return res.sendStatus(404);
        }

        return res.send(visitor);
    } catch (err) {
        console.error(err);
        return res.sendStatus(400);
    }
}

export async function getPerformanceVisitorsHandler(
    req: Request<ReadVisitorInput['params']>,
    res: Response
) {
    try {
        console.log(req.params);
        const visitors = await getAllVisitors({
            performance: req.params.performance,
        });
        if (!visitors) {
            return res.sendStatus(404);
        }
        return res.send(visitors);
    } catch (e) {
        console.error(e);
        return res.sendStatus(400);
    }
}

export async function getVisitorsHandler(req: Request, res: Response) {
    try {
        const visitors = await getAllVisitors({});
        if (!visitors) {
            return res.sendStatus(404);
        }
        return res.send(visitors);
    } catch (e) {
        console.error(e);
        return res.sendStatus(400);
    }
}

export async function deleteVisitorHandler(
    req: Request<DeleteVisitorInput['params']>,
    res: Response
) {
    try {
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
    } catch (e) {
        console.error(e);
        return res.sendStatus(400);
    }
}
