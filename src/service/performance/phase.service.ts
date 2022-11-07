import { databaseResponseTimeHistogram } from '../../utils/metrics';
import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import { CreatePhaseInput } from '../../schema/performance/phase.schema';
import PhaseModel, {
    PhaseDocument,
} from '../../models/performance/phase.model';

export async function createPhase(input: CreatePhaseInput) {
    const metricsLabels = {
        operation: 'createPhase',
    };
    const timer = databaseResponseTimeHistogram.startTimer();

    try {
        const result = await PhaseModel.create(input);
        timer({ ...metricsLabels, success: 'true' });
        return result;
    } catch (e) {
        timer({ ...metricsLabels, success: 'false' });
        console.error(e);
    }
}

export async function findPhase(
    query: FilterQuery<PhaseDocument>,
    options: QueryOptions = { lean: true }
) {
    const metricsLabels = {
        operation: 'findPhase',
    };
    console.log(query);
    const timer = databaseResponseTimeHistogram.startTimer();
    try {
        const result = await PhaseModel.findOne(query, {}, options);
        timer({ ...metricsLabels, success: 'true' });
        console.log(result);
        return result;
    } catch (e) {
        timer({ ...metricsLabels, success: 'false' });

        console.error(e);
    }
}

export async function findAndUpdatePhase(
    query: FilterQuery<PhaseDocument>,
    update: UpdateQuery<PhaseDocument>,
    options: QueryOptions
) {
    return PhaseModel.findOneAndUpdate(query, update, options);
}

export async function deletePhase(query: FilterQuery<PhaseDocument>) {
    return PhaseModel.deleteOne(query);
}
export async function getAllPhases() {
    return PhaseModel.find();
}
