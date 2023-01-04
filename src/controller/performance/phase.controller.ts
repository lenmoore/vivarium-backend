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
import {
    findAndUpdateVisitor,
    getAllVisitors,
} from '../../service/performance/visitor.service';
import { cloneDeep, now } from 'lodash';
import { Schema } from 'mongoose';

import QuizResultModel from '../../models/performance/quiz-results.model';
import quizResultsModel from '../../models/performance/quiz-results.model';
import { findGame } from '../../service/performance/game.service';
import VisitorModel from '../../models/performance/visitor.model';

export async function createPhaseHandler(
    req: Request<CreatePhaseInput>,
    res: Response
) {
    try {
        const body = req.body;

        const Phase = await createPhase({ ...body });

        return res.send(Phase);
    } catch (e) {
        console.error(e);
    }
}

export async function updatePhaseHandler(
    req: Request<UpdatePhaseInput['params']>,
    res: Response
) {
    try {
        const phaseId = req.params.phaseId;
        const update = req.body;

        const phase = await findPhase({ phaseId });

        if (!phase) {
            return res.sendStatus(404);
        }

        if (update.active === true) {
            const visitors = await getAllVisitors({ archived: false });
            console.log('I FOUND VISITORS: ', visitors.length);
            const phaseGame = await findGame({ _id: phase.phase_game });
            console.log('PHASE_______ ', phase);
            for (const visitor of visitors) {
                console.log(visitor);
                console.log(typeof visitor);
                const addQuizResults = [];
                const visitorId = visitor._id.toString();
                for (const game_step of phaseGame.game_steps) {
                    console.log(
                        'GAME STEP:',
                        game_step.question_text,
                        '    VISITOR: ',
                        visitor.wardrobe_number
                    );

                    const createResult = await QuizResultModel.create({
                        step: game_step,
                        game: phaseGame,
                        result_text: '-',
                        result_humanity_values: {
                            green: 0,
                            red: 0,
                            blue: 0,
                            orange: 0,
                        },
                        visitor: visitorId,
                    });
                    console.log(createResult._id);
                    addQuizResults.push(createResult);

                    visitor.quiz_results.push(createResult);
                }
                console.log(addQuizResults);
                await findAndUpdateVisitor(
                    { visitorId: visitorId },
                    {
                        quiz_results: addQuizResults,
                    },
                    {
                        new: true,
                    }
                );
                visitor.save();
            }
        }
        console.log('done activating phase.');
        const updatedPhase = await findAndUpdatePhase({ phaseId }, update, {
            new: true,
        });

        return res.send(updatedPhase);
    } catch (e) {
        console.error(e);
    }
}

export async function getPhaseHandler(
    req: Request<ReadPhaseInput['params']>,
    res: Response
) {
    try {
        const phaseId = req.params.phaseId;
        const phase = await findPhase({ _id: phaseId });

        if (!phase) {
            return res.sendStatus(404);
        }

        return res.send(phase);
    } catch (e) {
        console.error(e);
    }
}

export async function getPhasesHandler(req: Request, res: Response) {
    try {
        const Phases = await getAllPhases();

        if (!Phases) {
            return res.sendStatus(404);
        }

        return res.send(Phases);
    } catch (e) {
        console.error(e);
    }
}

export async function deletePhaseHandler(
    req: Request<DeletePhaseInput['params']>,
    res: Response
) {
    try {
        const phaseId = req.params.phaseId;

        const phase = await findPhase({ phaseId });
        console.log(phase);

        if (!phase) {
            return res.sendStatus(404);
        }

        await deletePhase({ phase });

        return res.sendStatus(200);
    } catch (e) {
        console.error(e);
    }
}
