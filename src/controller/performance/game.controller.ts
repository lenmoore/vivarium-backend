import {
    CreateGameInput,
    DeleteGameInput,
    ReadGameInput,
    UpdateGameInput,
} from '../../schema/performance/game.schema';
import {
    createGame,
    deleteGame,
    findAndUpdateGame,
    findGame,
    getAllGames,
} from '../../service/performance/game.service';
import { Request, Response } from 'express';
import { createStepHandler } from './step.controller';
import {
    createStep,
    findAndUpdateStep,
} from '../../service/performance/step.service';
import StepModel from '../../models/performance/step.model';

export async function createGameHandler(
    req: Request<CreateGameInput>,
    res: Response
) {
    const body = req.body;

    const Game = await createGame({ ...body });

    return res.send(Game);
}

export async function updateGameHandler(
    req: Request<UpdateGameInput['params']>,
    res: Response
) {
    const gameId = req.params.gameId;
    let update = req.body;
    const stepIds = [];
    const game = await findGame({ gameId });
    console.log(req.body);
    if (req.body.game_steps) {
        const steps = req.body.game_steps;
        for (const requestStep of steps) {
            if (requestStep._id) {
                // if the game step is not a new one
                stepIds.push(requestStep._id);

                await findAndUpdateStep(
                    { stepId: requestStep._id },
                    requestStep,
                    { new: true }
                );
            } else {
                // create new
                stepIds.push((await createStep(requestStep))._id);
            }
        }
    }

    if (!game) {
        return res.sendStatus(404);
    }

    update = { ...update, game_steps: stepIds };

    const updatedGame = await findAndUpdateGame({ gameId }, update, {
        new: true,
    });

    return res.send(updatedGame);
}

export async function getGameHandler(
    req: Request<ReadGameInput['params']>,
    res: Response
) {
    console.log('req.params >>>>>> ', req.params);
    const gameId = req.params.gameId;
    const game = await findGame({ _id: gameId });

    if (!game) {
        return res.sendStatus(404);
    }

    return res.send(game);
}

export async function getGamesHandler(req: Request, res: Response) {
    const games = await getAllGames();

    if (!games) {
        return res.sendStatus(404);
    }

    return res.send(games);
}

export async function deleteGameHandler(
    req: Request<DeleteGameInput['params']>,
    res: Response
) {
    const gameId = req.params.gameId;

    const game = await findGame({ gameId });
    console.log(game);

    if (!game) {
        return res.sendStatus(404);
    }

    await deleteGame({ game });

    return res.sendStatus(200);
}