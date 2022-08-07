import { Request, Response } from 'express';
import {
    createPerformance,
    deletePerformance,
    findAndUpdatePerformance,
    findPerformance,
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
    const userId = res.locals.user._id;

    const body = req.body;

    const performance = await createPerformance({ ...body, user: userId });

    return res.send(performance);
}

export async function updatePerformanceHandler(
    req: Request<UpdatePerformanceInput['params']>,
    res: Response
) {
    const userId = res.locals.user._id;

    const performanceId = req.params.performanceId;
    const update = req.body;

    const performance = await findPerformance({ performanceId });

    if (!performance) {
        return res.sendStatus(404);
    }

    if (String(performance.user) !== userId) {
        return res.sendStatus(403);
    }

    const updatedPerformance = await findAndUpdatePerformance(
        { performanceId },
        update,
        {
            new: true,
        }
    );

    return res.send(updatedPerformance);
}

export async function getPerformanceHandler(
    req: Request<ReadPerformanceInput['params']>,
    res: Response
) {
    const performanceId = req.params.performanceId;
    const performance = await findPerformance({ performanceId });

    if (!performance) {
        return res.sendStatus(404);
    }

    return res.send(performance);
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
