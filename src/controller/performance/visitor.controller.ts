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
import { signVisitorAccessToken } from '../../service/auth.service';
import { createBasket } from '../../service/humanity-shop/basket.service';
import {
    findAndUpdatePerformance,
    findPerformance,
} from '../../service/performance/performance.service';
import QuizResultModel from '../../models/performance/quiz-results.model';
import VisitorModel from '../../models/performance/visitor.model';
import PerformanceModel from '../../models/performance/performance.model';
import { cloneDeep } from 'lodash';
import ProductModel from '../../models/humanity-shop/product.model';
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
        // console.log('i created this visitor', visitor);
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
    // console.log('trying to archive vistiors');
    try {
        await archiveVisitors(req.body);
        // console.log(req.body);
        return res.sendStatus(204);
    } catch (e) {
        console.error(e);
        return res.sendStatus(400);
    }
}

export async function archiveVisitors(update: any) {
    try {
        // console.log('update:', update);
        await VisitorModel.updateMany(
            { performance: update._id },
            { archived: true }
        );
    } catch (e) {
        console.error(e);
    }
}

export async function updateQuizResult(req: Request, res: Response) {
    try {
        console.log(req.body.result_text);
        const body = req.body;
        const quizResult = await QuizResultModel.findByIdAndUpdate(
            body._id,
            body
        );
        res.send(quizResult);
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
            // console.log(quizResults);
            for (const qr of quizResults) {
                // console.log('QUIZ RESULT QUIZ RESULT ------------------', qr);

                // console.log(qr._id);
                if (qr._id == null) {
                    const result = await QuizResultModel.create({
                        ...qr,
                        visitor: visitor,
                        result_humanity_values: {
                            lime: 0,
                            fuchsia: 0,
                            silver: 0,
                            turq: 0,
                        },
                    });
                    // console.log(result);
                    addQuizResults.push(result);
                } else {
                    const result = await QuizResultModel.findByIdAndUpdate(
                        { _id: qr._id },
                        qr
                    );
                    addQuizResults.push(result);
                    // console.log('SHOULD HAVE UPDATED', result);
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

export async function getVisitorByDateNumberHandler(
    req: Request,
    res: Response
) {
    try {
        const date = new Date(req.params.date);
        const wardrobe_number = req.params.wardrobeNumber;
        // console.log(date, wardrobe_number, '<<<< trying to find this visitor');
        const performance = await PerformanceModel.findOne(
            { date: date },
            {},
            {}
        );
        // console.log('found performance: ', performance);

        const visitor = await findVisitor({
            performance: performance._id,
            wardrobe_number: wardrobe_number,
        });
        // console.log(visitor);

        return res.send(visitor);
    } catch (err) {
        console.error(err);
        return res.sendStatus(400);
    }
}
export async function getVisitorByDateHandler(req: Request, res: Response) {
    try {
        console.log(req.params);
        const date = new Date(req.params.date);
        const performance = await PerformanceModel.findOne(
            { date: date },
            {},
            {}
        );
        console.log('found performance: ', performance);

        const visitors = await VisitorModel.find({
            performance: performance._id,
        });
        // console.log(visitor);

        const sortedVisitors = visitors.sort(
            (a, b) => a.wardrobe_number - b.wardrobe_number
        );
        return res.send(sortedVisitors);
    } catch (err) {
        console.error(err);
        return res.sendStatus(400);
    }
}

function getVisitorHighest(visitor) {
    // console.log(visitor);
    // console.log(visitor.basket);
    // console.log('-----\n', visitor.wardrobe_number);
    const basket = visitor.basket;

    const redQuiz = visitor?.quiz_results
        ? visitor?.quiz_results?.map((qR) => {
              return qR?.result_humanity_values?.fuchsia;
          })
        : [];
    const greenQuiz = visitor?.quiz_results
        ? visitor?.quiz_results?.map((qR) => {
              return qR?.result_humanity_values?.lime;
          })
        : [];
    const blueQuiz = visitor?.quiz_results
        ? visitor?.quiz_results?.map((qR) => {
              return qR?.result_humanity_values?.silver;
          })
        : [];
    const orangeQuiz = visitor?.quiz_results
        ? visitor?.quiz_results?.map((qR) => {
              return qR?.result_humanity_values?.turq;
          })
        : [];

    const redProducts = [];
    const silverProducts = [];
    const limeProducts = [];
    const turqProducts = [];
    // todo something got fucked up here idkkk.
    // redProducts = allProducts.map(
    //     (p) =>
    //         p?.humanity_values?.fuchsia?.average ||
    //         p?.humanity_values?.red?.average ||
    //         0
    // );
    // silverProducts = allProducts.map(
    //     (p) =>
    //         p?.humanity_values?.blue?.average ||
    //         p?.humanity_values?.silver?.average ||
    //         0
    // );
    // limeProducts = allProducts.map(
    //     (p) =>
    //         p?.humanity_values?.lime?.average ||
    //         p?.humanity_values?.green?.average ||
    //         0
    // );
    // turqProducts = allProducts.map(
    //     (p) =>
    //         p?.humanity_values?.turq?.average ||
    //         p?.humanity_values?.orange?.average ||
    //         0
    // );
    const fuchsia = [...redQuiz, ...redProducts];
    const lime = [...greenQuiz, ...limeProducts];
    const silver = [...blueQuiz, ...silverProducts];
    const turq = [...orangeQuiz, ...turqProducts];
    const absolute_hum_values = {
        lime: lime?.reduce((a, b) => a + b, 0),
        fuchsia: fuchsia?.reduce((a, b) => a + b, 0),
        silver: silver?.reduce((a, b) => a + b, 0),
        turq: turq?.reduce((a, b) => a + b, 0),
    };

    const sum =
        absolute_hum_values.fuchsia +
        absolute_hum_values.lime +
        absolute_hum_values.silver +
        absolute_hum_values.turq;
    const avg_hum_values = [
        {
            color: 'lime',
            value: absolute_hum_values?.lime / sum,
        },
        {
            color: 'fuchsia',
            value: absolute_hum_values?.fuchsia / sum,
        },
        {
            color: 'turq',
            value: absolute_hum_values?.turq / sum,
        },

        {
            color: 'silver',
            value: absolute_hum_values?.silver / sum,
        },
    ];
    const highest = avg_hum_values.sort((a, b) => b.value - a.value)[0].color;
    // console.log(avg_hum_values);
    // console.log(highest);
    return highest;
}
export async function getSummaryByDate(req: Request, res: Response) {
    try {
        const date = new Date(req.params.date);
        const performance = await PerformanceModel.findOne(
            { date: date },
            {},
            {}
        ).populate({
            path: 'phases',
            populate: {
                path: 'phase_game',
                populate: { path: 'game_steps' },
            },
        });
        const products = await ProductModel.find();

        const olenUsunId = '63bfe34e28a69a85e5bb5048';
        const jahEiId = '63bfe35728a69a85e5bb5056';
        console.log(performance.phases.length);
        const gamesPreCapsule = performance.phases.filter((phase) =>
            [olenUsunId, jahEiId].includes(phase._id.toString())
        );

        const visitors = await VisitorModel.find({
            performance: performance._id,
        })
            .populate('quiz_results')
            .populate({
                path: 'basket',
                populate: { path: 'products' },
            });
        const highestValuesVisitors = visitors.map((v) => ({
            ...v,
            highest: getVisitorHighest(v),
        }));
        let allQuizResults = [];
        const productsInCapsule = [];
        const capsuleProducts = [];
        visitors.forEach((vis) => {
            vis.basket.products.forEach((product) => {
                productsInCapsule.push({
                    title: product.title,
                    image: product.image,
                    visitorColor: vis.confirmed_humanity_value,
                });
            });
            allQuizResults = [
                ...allQuizResults,
                ...vis.quiz_results.filter(
                    (res) => res.result_text?.length > 1
                ),
            ];
        });
        products.forEach((cP) => {
            const prod = {
                title: cP.title,
                image: cP.image,
                count: productsInCapsule.filter((p) => p.image === cP.image)
                    .length,
                colors: {
                    turq: productsInCapsule.filter(
                        (p) => p.visitorColor === 'turq' && p.image === cP.image
                    ).length,
                    silver: productsInCapsule.filter(
                        (p) =>
                            p.visitorColor === 'silver' && p.image === cP.image
                    ).length,
                    fuchsia: productsInCapsule.filter(
                        (p) =>
                            p.visitorColor === 'fuchsia' && p.image === cP.image
                    ).length,
                    lime: productsInCapsule.filter(
                        (p) => p.visitorColor === 'lime' && p.image === cP.image
                    ).length,
                },
            };
            capsuleProducts.push(prod);
        });

        const humanityValuesByHighest = {
            turq: highestValuesVisitors.filter((v) => v.highest === 'turq')
                .length,
            silver: highestValuesVisitors.filter((v) => v.highest === 'silver')
                .length,
            fuchsia: highestValuesVisitors.filter(
                (v) => v.highest === 'fuchsia'
            ).length,
            lime: highestValuesVisitors.filter((v) => v.highest === 'lime')
                .length,
        };
        const visitorsWereDividedIn = {
            turq: visitors.filter((v) => v.confirmed_humanity_value === 'turq')
                .length,
            silver: visitors.filter(
                (v) => v.confirmed_humanity_value === 'silver'
            ).length,
            fuchsia: visitors.filter(
                (v) => v.confirmed_humanity_value === 'fuchsia'
            ).length,
            lime: visitors.filter((v) => v.confirmed_humanity_value === 'lime')
                .length,
        };
        const performanceSummary = {
            performance: performance,
            amountOfVisitors: visitors.length,
            visitors: visitors,
            humanityValuesByHighest,
            visitorsWereDividedIn,
            capsuleProducts,
            gamesPreCapsule,
            allQuizResults,
        };

        return res.send(performanceSummary);
    } catch (err) {
        console.error(err);
        return res.sendStatus(400);
    }
}

export async function getPerformanceVisitorsHandler(
    req: Request,
    res: Response
) {
    let visitors = [];
    try {
        // console.log(req.params);
        if (req.params.performance) {
            visitors = await getAllVisitors({
                performance: req.params.performance,
            });
        } else {
            const activePerformance = await PerformanceModel.findOne({
                active: true,
            });
            visitors = await getAllVisitors({
                performance: activePerformance._id,
            });
        }

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
        // const userId = res.locals.user._id;
        const visitorId = req.params.visitorId;

        const visitor = await findVisitor({ visitorId });

        if (!visitor) {
            return res.sendStatus(404);
        }

        // if (String(visitor.user) !== userId) {
        //     return res.sendStatus(403);
        // }

        await deleteVisitor({ visitorId });

        return res.sendStatus(200);
    } catch (e) {
        console.error(e);
        return res.sendStatus(400);
    }
}
