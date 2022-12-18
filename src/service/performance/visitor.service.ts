import { CreateVisitorInput } from '../../schema/performance/visitor.schema';
import { databaseResponseTimeHistogram } from '../../utils/metrics';
import VisitorModel, {
    VisitorDocument,
} from '../../models/performance/visitor.model';
import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

export async function createVisitor(input: CreateVisitorInput) {
    const metricsLabels = {
        operation: 'createVisitor',
    };
    const timer = databaseResponseTimeHistogram.startTimer();

    try {
        const result = await VisitorModel.create(input);
        timer({ ...metricsLabels, success: 'true' });
        console.log('im really creating a visitor->', result);
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
            .populate('basket')
            .populate('quiz_results');
        console.log('VISITOR RESULT', result);
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
    // console.log('updada');
    try {
        // console.log(update);
        return VisitorModel.findOneAndUpdate(query, update, options)
            .populate('basket')
            .populate('quiz_results');
    } catch (e) {
        console.error(e);
    }
}

export async function confirmVisitorColors(update: Array<any>) {
    try {
        for (const visitor of update) {
            console.log(visitor);
            console.log(visitor != undefined);
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
    console.log('see ju');
    const result = await VisitorModel.find(query, {}, options)
        .populate({
            path: 'basket',
            populate: {
                path: 'products',
            },
        })
        .populate('quiz_results');
    console.log(result.length, ' found');
    console.log(result, ' found');
    return result;
}
