import {
    createPhase,
    deletePhase,
    findAndUpdatePhase,
    findPhase,
    getAllPhases,
} from '../../service/performance/phase.service';
import {
    CreatePhaseInput,
    ReadPhaseInput,
    UpdatePhaseInput,
    DeletePhaseInput,
} from '../../schema/performance/phase.schema';
import { Request, Response } from 'express';

export async function createPhaseHandler(
    req: Request<CreatePhaseInput>,
    res: Response
) {
    const body = req.body;

    const Phase = await createPhase({ ...body });

    return res.send(Phase);
}

export async function updatePhaseHandler(
    req: Request<UpdatePhaseInput['params']>,
    res: Response
) {
    const phaseId = req.params.phaseId;
    const update = req.body;

    const phase = await findPhase({ phaseId });

    if (!phase) {
        return res.sendStatus(404);
    }

    const updatedPhase = await findAndUpdatePhase({ phaseId }, update, {
        new: true,
    });

    return res.send(updatedPhase);
}

export async function getPhaseHandler(
    req: Request<ReadPhaseInput['params']>,
    res: Response
) {
    console.log('req.params >>>>>> ', req.params);
    const phaseId = req.params.phaseId;
    const phase = await findPhase({ _id: phaseId });

    if (!phase) {
        return res.sendStatus(404);
    }

    return res.send(phase);
}

export async function getPhasesHandler(req: Request, res: Response) {
    const Phases = await getAllPhases();

    if (!Phases) {
        return res.sendStatus(404);
    }

    return res.send(Phases);
}

export async function deletePhaseHandler(
    req: Request<DeletePhaseInput['params']>,
    res: Response
) {
    const phaseId = req.params.phaseId;

    const phase = await findPhase({ phaseId });
    console.log(phase);

    if (!phase) {
        return res.sendStatus(404);
    }

    await deletePhase({ phase });

    return res.sendStatus(200);
}
