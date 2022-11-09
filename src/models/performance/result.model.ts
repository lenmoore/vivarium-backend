import mongoose from 'mongoose';
import { ResultDocument } from './quiz-results.model';
import { customAlphabet } from 'nanoid';
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);

const resultSchema = new mongoose.Schema({
    resultId: {
        type: String,
        required: true,
        unique: true,
        default: () => `result_${nanoid()}`,
    },
});

const resultModel = mongoose.model<ResultDocument>('Result', resultSchema);

export default resultModel;
