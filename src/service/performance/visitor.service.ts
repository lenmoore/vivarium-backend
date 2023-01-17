import { CreateVisitorInput } from '../../schema/performance/visitor.schema';
import { databaseResponseTimeHistogram } from '../../utils/metrics';
import VisitorModel, {
    VisitorDocument,
} from '../../models/performance/visitor.model';
import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import StepModel from '../../models/performance/step.model';
import QuizResultModel from '../../models/performance/quiz-results.model';
import GameModel from '../../models/performance/game.model';

export async function createVisitor(input: CreateVisitorInput) {
    const metricsLabels = {
        operation: 'createVisitor',
    };
    const timer = databaseResponseTimeHistogram.startTimer();

    try {
        const result = await VisitorModel.create(input);

        const allGamesEver = await GameModel.find();
        const addQuizResults = [];

        for (const game of allGamesEver) {
            for (const game_step of game.game_steps) {
                const createResult = await QuizResultModel.create({
                    step: game_step,
                    game: game,
                    result_text: '-',
                    result_humanity_values: {
                        lime: 0,
                        fuchsia: 0,
                        silver: 0,
                        turq: 0,
                    },
                    visitor: result._id,
                });
                addQuizResults.push(createResult);
                result.quiz_results.push(createResult);
            }
        }

        await findAndUpdateVisitor(
            { visitorId: result._id },
            {
                quiz_results: addQuizResults,
            },
            {
                new: true,
            }
        );
        result.save();
        timer({ ...metricsLabels, success: 'true' });
        // console.log('im really creating a visitor->', result);

        return result;
    } catch (e) {
        timer({ ...metricsLabels, success: 'false' });
        console.error(e);
    }
}

export async function findVisitor(
    query: FilterQuery<VisitorDocument>,
    options: QueryOptions = {}
) {
    const metricsLabels = {
        operation: 'findVisitor',
    };

    const timer = databaseResponseTimeHistogram.startTimer();
    try {
        const result = await VisitorModel.findOne(query, {}, options)
            .populate({
                path: 'basket',
                populate: {
                    path: 'products',
                },
            })
            .populate({ path: 'quiz_results', populate: 'step' });
        // console.log('VISITOR RESULT', result);
        timer({ ...metricsLabels, success: 'true' });
        return result;
    } catch (e) {
        timer({ ...metricsLabels, success: 'false' });

        console.error(e);
    }
}

export async function findAndUpdateVisitor(
    query: FilterQuery<VisitorDocument>,
    update: UpdateQuery<VisitorDocument>,
    options: QueryOptions
) {
    // // console.log('updada');
    try {
        // // console.log('Update: __ ', update.quiz_results);
        return VisitorModel.findOneAndUpdate(query, update, options)
            .populate({
                path: 'basket',
                populate: {
                    path: 'products',
                },
            })
            .populate({ path: 'quiz_results' });
    } catch (e) {
        console.error(e);
    }
}

export async function confirmVisitorColors(update: Array<any>) {
    try {
        for (const visitor of update) {
            // console.log(visitor);
            // console.log(visitor != undefined);
            await VisitorModel.findOneAndUpdate(
                { visitorId: visitor.visitorId },
                {
                    confirmed_humanity_value: visitor.confirmed_humanity_value,
                },
                {}
            );
        }
    } catch (e) {
        console.error(e);
    }
}

export async function deleteVisitor(query: FilterQuery<VisitorDocument>) {
    return VisitorModel.deleteOne(query);
}
export async function getAllVisitors(
    query: FilterQuery<VisitorDocument>,
    options: QueryOptions = {}
) {
    // console.log('see ju');
    const result = await VisitorModel.find(query, {}, options)
        .populate({
            path: 'basket',
            populate: {
                path: 'products',
            },
        })
        .populate('quiz_results');
    // console.log(result.length, ' found');
    return result;
}
