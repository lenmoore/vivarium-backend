import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import { CreatePerformanceInput } from '../../schema/performance/performance.schema';
import PerformanceModel, {
    PerformanceDocument,
} from '../../models/performance/performance.model';
import { databaseResponseTimeHistogram } from '../../utils/metrics';

export async function createPerformance(input: CreatePerformanceInput) {
    const metricsLabels = {
        operation: 'createPerformance',
    };
    const timer = databaseResponseTimeHistogram.startTimer();

    try {
        const result = await PerformanceModel.create(input);
        timer({ ...metricsLabels, success: 'true' });
        return result;
    } catch (e) {
        timer({ ...metricsLabels, success: 'false' });
        console.error(e);
    }
}

export async function findPerformance(
    query: FilterQuery<PerformanceDocument>,
    options: QueryOptions = {}
) {
    const metricsLabels = {
        operation: 'findPerformance',
    };
    console.log(query);
    const timer = databaseResponseTimeHistogram.startTimer();
    try {
        const result = await PerformanceModel.findOne(query, {}, options);
        result.populate({ path: 'phases' }); // todo why wont it populate with objects

        timer({ ...metricsLabels, success: 'true' });
        console.log('result findperformances: ', result);
        return result;
    } catch (e) {
        timer({ ...metricsLabels, success: 'false' });

        console.error(e);
    }
}

export async function findAndUpdatePerformance(
    query: FilterQuery<PerformanceDocument>,
    update: UpdateQuery<PerformanceDocument>,
    options: QueryOptions
) {
    return PerformanceModel.findOneAndUpdate(query, update, options);
}

export async function deletePerformance(
    query: FilterQuery<PerformanceDocument>
) {
    return PerformanceModel.deleteOne(query);
}
export async function getAllPerformances() {
    return PerformanceModel.find();
}
