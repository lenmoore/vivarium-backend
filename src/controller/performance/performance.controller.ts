import { Request, Response } from 'express';
import {
    createPerformance,
    deletePerformance,
    findAndUpdatePerformance,
    findPerformance,
    getAllPerformances,
} from '../../service/performance/performance.service';
import {
    CreatePerformanceInput,
    DeletePerformanceInput,
    ReadPerformanceInput,
    UpdatePerformanceInput,
} from '../../schema/performance/performance.schema';

export async function createPerformanceHandler(
    req: Request<CreatePerformanceInput>,
    res: Response
) {
    try {
        const userId = res.locals.user._id;

        const body = req.body;

        const performance = await createPerformance({ ...body, user: userId });

        return res.send(performance);
    } catch (e) {
        console.error(e);
    }
}

export async function updatePerformanceHandler(
    req: Request<UpdatePerformanceInput['params']>,
    res: Response
) {
    const performanceId = req.params.performanceId;
    console.log(req.params);
    const update = req.body;
    console.log(update.active);

    const updatedPerformance = await findAndUpdatePerformance(
        { _id: performanceId },
        update,
        {
            new: true,
        }
    );

    console.log(updatedPerformance);
    return res.send(updatedPerformance);
}

export async function getPerformanceHandler(
    req: Request<ReadPerformanceInput['params']>,
    res: Response
) {
    console.log('req.params >>>>>> ', req.params);
    const performanceId = req.params.performanceId;
    const performance = await findPerformance({ performanceId: performanceId });

    if (!performance) {
        return res.sendStatus(404);
    }

    return res.send(performance);
}

export async function getPerformancesHandler(req: Request, res: Response) {
    const performances = await getAllPerformances();

    if (!performances) {
        return res.sendStatus(404);
    }

    return res.send(performances);
}

export async function deletePerformanceHandler(
    req: Request<DeletePerformanceInput['params']>,
    res: Response
) {
    const userId = res.locals.user._id;
    const performanceId = req.params.performanceId;

    const performance = await findPerformance({ performanceId });
    console.log(performance);

    if (!performance) {
        return res.sendStatus(404);
    }

    if (String(performance.user) !== userId) {
        return res.sendStatus(403);
    }

    await deletePerformance({ performanceId });

    return res.sendStatus(200);
}
