import { Request, Response } from 'express';
import {
    CreateVisitorInput,
    DeleteVisitorInput,
    ReadVisitorInput,
    UpdateVisitorInput,
} from '../../schema/performance/visitor.schema';
import {
    confirmVisitorColors,
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
import VisitorModel from '../../models/performance/visitor.model';
import performanceModel from '../../models/performance/performance.model';

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

        let visitor = await createVisitor({ ...body, user: userId });
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

        visitor = await findAndUpdateVisitor(
            { _id: visitor._id },
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
        console.log('i created this visitor', visitor);
        visitor.accessToken = accessToken; // just in case
        return res.send(visitor);
    } catch (e) {
        console.error(e);
    }
}
export async function updateVisitorColorsHandler(req: Request, res: Response) {
    try {
        await confirmVisitorColors(req.body);
        return res.sendStatus(204);
    } catch (e) {
        console.error(e);
        return res.sendStatus(400);
    }
}
export async function archiveVisitorsHandler(req: Request, res: Response) {
    console.log('trying to archive vistiors');
    try {
        await archiveVisitors(req.body);
        console.log(req.body);
        return res.sendStatus(204);
    } catch (e) {
        console.error(e);
        return res.sendStatus(400);
    }
}

export async function archiveVisitors(update: any) {
    try {
        console.log('update:', update);
        await VisitorModel.updateMany(
            { performance: update._id },
            { archived: true }
        );
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

        const addQuizResults = [];
        if (update.quiz_results) {
            const quizResults = update.quiz_results;
            console.log(quizResults);
            for (const qr of quizResults) {
                console.log('QUIZ RESULT QUIZ RESULT ------------------', qr);

                console.log(qr._id);
                if (qr._id == null) {
                    const result = await QuizResultModel.create({
                        ...qr,
                        visitor: visitor,
                        result_humanity_values: {
                            green: 0,
                            red: 0,
                            blue: 0,
                            orange: 0,
                        },
                    });
                    console.log(result);
                    addQuizResults.push(result);
                } else {
                    const result = await QuizResultModel.findByIdAndUpdate(
                        { _id: qr._id },
                        qr
                    );
                    addQuizResults.push(result);
                    console.log('SHOULD HAVE UPDATED', result);
                }
            }
        }
        const updatedVisitor = await findAndUpdateVisitor(
            { visitorId },
            {
                ...update,
                quiz_results: addQuizResults,
            },
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
