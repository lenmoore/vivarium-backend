import { Request, Response } from 'express';
import {
    createStep,
    deleteStep,
    findAndUpdateStep,
    findStep,
    getAllSteps,
} from '../../service/performance/step.service';
import {
    CreateStepInput,
    DeleteStepInput,
    ReadStepInput,
    UpdateStepInput,
} from '../../schema/performance/step.schema';

export async function createStepHandler(
    req: Request<CreateStepInput>,
    res: Response
) {
    try {
        const body = req.body;

        const Step = await createStep({ ...body });

        return res.send(Step);
    } catch (e) {
        console.error(e);
    }
}

export async function updateStepHandler(
    req: Request<UpdateStepInput['params']>,
    res: Response
) {
    try {
        const stepId = req.params.stepId;
        const update = req.body;

        const step = await findStep({ stepId });

        if (!step) {
            return res.sendStatus(404);
        }

        const updatedStep = await findAndUpdateStep({ stepId }, update, {
            new: true,
        });

        return res.send(updatedStep);
    } catch (e) {
        console.error(e);
    }
}

export async function getStepHandler(
    req: Request<ReadStepInput['params']>,
    res: Response
) {
    try {
        const stepId = req.params.stepId;
        const step = await findStep({ _id: stepId });

        if (!step) {
            return res.sendStatus(404);
        }

        return res.send(step);
    } catch (e) {
        console.error(e);
    }
}

export async function getStepsHandler(req: Request, res: Response) {
    try {
        const steps = await getAllSteps();

        if (!steps) {
            return res.sendStatus(404);
        }

        return res.send(steps);
    } catch (e) {
        console.error(e);
    }
}

export async function deleteStepHandler(
    req: Request<DeleteStepInput['params']>,
    res: Response
) {
    try {
        const stepId = req.params.stepId;

        const step = await findStep({ stepId });
        // console.log(step);

        if (!step) {
            return res.sendStatus(404);
        }

        await deleteStep({ step });

        return res.sendStatus(200);
    } catch (e) {
        console.error(e);
    }
}
