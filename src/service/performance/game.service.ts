import { databaseResponseTimeHistogram } from '../../utils/metrics';
import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import GameModel, { GameDocument } from '../../models/performance/game.model';
import { CreateGameInput } from '../../schema/performance/game.schema';

export async function createGame(input: CreateGameInput) {
    const metricsLabels = {
        operation: 'createGame',
    };
    const timer = databaseResponseTimeHistogram.startTimer();

    try {
        const result = await GameModel.create(input);
        timer({ ...metricsLabels, success: 'true' });
        return result;
    } catch (e) {
        timer({ ...metricsLabels, success: 'false' });
        console.error(e);
    }
}

export async function findGame(
    query: FilterQuery<GameDocument>,
    options: QueryOptions = { lean: true }
) {
    const metricsLabels = {
        operation: 'findGame',
    };
    console.log(query);
    const timer = databaseResponseTimeHistogram.startTimer();
    try {
        const result = await GameModel.findOne(query, {}, options);
        timer({ ...metricsLabels, success: 'true' });
        console.log(result);
        return result;
    } catch (e) {
        timer({ ...metricsLabels, success: 'false' });

        console.error(e);
    }
}

export async function findAndUpdateGame(
    query: FilterQuery<GameDocument>,
    update: UpdateQuery<GameDocument>,
    options: QueryOptions
) {
    return GameModel.findOneAndUpdate(query, update, options);
}

export async function deleteGame(query: FilterQuery<GameDocument>) {
    return GameModel.deleteOne(query);
}
export async function getAllGames() {
    return GameModel.find();
}
