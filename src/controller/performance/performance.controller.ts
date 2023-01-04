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
    try {
        const performanceId = req.params.performanceId;
        const update = req.body;

        const updatedPerformance = await findAndUpdatePerformance(
            { _id: performanceId },
            update,
            {
                new: true,
            }
        );

        console.log(updatedPerformance);
        return res.send(updatedPerformance);
    } catch (e) {
        console.error(e);
    }
}

export async function getPerformanceHandler(
    req: Request<ReadPerformanceInput['params']>,
    res: Response
) {
    try {
        const performanceId = req.params.performanceId;
        const performance = await findPerformance({
            performanceId: performanceId,
        });

        if (!performance) {
            return res.sendStatus(404);
        }

        return res.send(performance);
    } catch (e) {
        console.error(e);
    }
}

export async function getPerformancesHandler(req: Request, res: Response) {
    try {
        const performances = await getAllPerformances();

        if (!performances) {
            return res.sendStatus(404);
        }

        return res.send(performances);
    } catch (e) {
        console.error(e);
    }
}

export async function deletePerformanceHandler(
    req: Request<DeletePerformanceInput['params']>,
    res: Response
) {
    try {
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
    } catch (e) {
        console.error(e);
    }
}
