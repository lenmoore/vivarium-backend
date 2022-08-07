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
        return result;
    } catch (e) {
        timer({ ...metricsLabels, success: 'false' });
        throw e;
    }
}

export async function findVisitor(
    query: FilterQuery<VisitorDocument>,
    options: QueryOptions = { lean: true }
) {
    const metricsLabels = {
        operation: 'findVisitor',
    };

    const timer = databaseResponseTimeHistogram.startTimer();
    try {
        const result = await VisitorModel.findOne(query, {}, options);
        timer({ ...metricsLabels, success: 'true' });
        return result;
    } catch (e) {
        timer({ ...metricsLabels, success: 'false' });

        throw e;
    }
}

export async function findAndUpdateVisitor(
    query: FilterQuery<VisitorDocument>,
    update: UpdateQuery<VisitorDocument>,
    options: QueryOptions
) {
    return VisitorModel.findOneAndUpdate(query, update, options);
}

export async function deleteVisitor(query: FilterQuery<VisitorDocument>) {
    return VisitorModel.deleteOne(query);
}
