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
    const update = req.body;

    const game = await findGame({ gameId });

    if (!game) {
        return res.sendStatus(404);
    }

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
