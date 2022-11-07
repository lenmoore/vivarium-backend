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
    const body = req.body;

    const Step = await createStep({ ...body });

    return res.send(Step);
}

export async function updateStepHandler(
    req: Request<UpdateStepInput['params']>,
    res: Response
) {
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
}

export async function getStepHandler(
    req: Request<ReadStepInput['params']>,
    res: Response
) {
    console.log('req.params >>>>>> ', req.params);
    const stepId = req.params.stepId;
    const step = await findStep({ _id: stepId });

    if (!step) {
        return res.sendStatus(404);
    }

    return res.send(step);
}

export async function getStepsHandler(req: Request, res: Response) {
    const steps = await getAllSteps();

    if (!steps) {
        return res.sendStatus(404);
    }

    return res.send(steps);
}

export async function deleteStepHandler(
    req: Request<DeleteStepInput['params']>,
    res: Response
) {
    const stepId = req.params.stepId;

    const step = await findStep({ stepId });
    console.log(step);

    if (!step) {
        return res.sendStatus(404);
    }

    await deleteStep({ step });

    return res.sendStatus(200);
}
