import { databaseResponseTimeHistogram } from '../../utils/metrics';
import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import StepModel, { StepDocument } from '../../models/performance/step.model';
import { CreateStepInput } from '../../schema/performance/step.schema';

export async function createStep(input: CreateStepInput) {
    const metricsLabels = {
        operation: 'createStep',
    };
    const timer = databaseResponseTimeHistogram.startTimer();

    try {
        const result = await StepModel.create(input);
        timer({ ...metricsLabels, success: 'true' });
        return result;
    } catch (e) {
        timer({ ...metricsLabels, success: 'false' });
        console.error(e);
    }
}

export async function findStep(
    query: FilterQuery<StepDocument>,
    options: QueryOptions = {}
) {
    const metricsLabels = {
        operation: 'findStep',
    };
    console.log(query);
    const timer = databaseResponseTimeHistogram.startTimer();
    try {
        const result = await StepModel.findOne(query, {}, options);
        timer({ ...metricsLabels, success: 'true' });
        console.log(result);
        return result;
    } catch (e) {
        timer({ ...metricsLabels, success: 'false' });

        console.error(e);
    }
}

export async function findAndUpdateStep(
    query: FilterQuery<StepDocument>,
    update: UpdateQuery<StepDocument>,
    options: QueryOptions
) {
    return StepModel.findOneAndUpdate(query, update, options);
}

export async function deleteStep(query: FilterQuery<StepDocument>) {
    return StepModel.deleteOne(query);
}
export async function getAllSteps() {
    return StepModel.find();
}
