import { databaseResponseTimeHistogram } from '../../utils/metrics';
import BasketModel, {
    BasketDocument,
    BasketInput,
} from '../../models/humanity-shop/basket.model';
import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

export async function createBasket(input: BasketInput) {
    const metricsLabels = {
        operation: 'createBasket',
    };
    const timer = databaseResponseTimeHistogram.startTimer();
    try {
        const result = await BasketModel.create(input);
        timer({ ...metricsLabels, success: 'true' });
        return result;
    } catch (e) {
        timer({ ...metricsLabels, success: 'false' });
        console.error(e);
    }
}

export async function findBasket(
    query: FilterQuery<BasketDocument>,
    options: QueryOptions = { lean: true }
) {
    const metricsLabels = {
        operation: 'findProduct',
    };

    const timer = databaseResponseTimeHistogram.startTimer();
    try {
        const result = await BasketModel.findOne(query, {}, options).populate(
            'products'
        );
        timer({ ...metricsLabels, success: 'true' });
        return result;
    } catch (e) {
        timer({ ...metricsLabels, success: 'false' });

        console.error(e);
    }
}
export async function getAllBaskets() {
    return BasketModel.find().populate('products');
}
export async function findAndUpdateBasket(
    query: FilterQuery<BasketDocument>,
    update: UpdateQuery<BasketDocument>,
    options: QueryOptions
) {
    return BasketModel.findOneAndUpdate(query, update, options);
}

export async function deleteBasket(query: FilterQuery<BasketDocument>) {
    return BasketModel.deleteOne(query);
}
