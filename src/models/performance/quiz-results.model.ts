import { customAlphabet } from 'nanoid';
import { VisitorDocument } from './visitor.model';
import mongoose, { mongo } from 'mongoose';
import { GameDocument } from './game.model';
import { StepDocument } from './step.model';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);

export interface Result {
    step: StepDocument['_id'];
    selected_value: {
        selected_text: string;
        selected_humanity_values: object;
    };
}

export interface ResultDocument extends Result, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}
export interface QuizResultInput {
    visitor: VisitorDocument['_id'];
    game: GameDocument['_id'];
    results: Array<ResultDocument>;
}

export interface QuizResultDocument extends QuizResultInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const quizResultSchema = new mongoose.Schema({
    quizResultId: {
        type: String,
        required: true,
        unique: true,
        default: () => `quiz_result_${nanoid()}`,
    },
    visitor: { type: mongoose.Schema.Types.ObjectId, ref: 'Visitor' },
    game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
    results: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Result' }],
});

const QuizResultModel = mongoose.model<QuizResultDocument>(
    'QuizResult',
    quizResultSchema
);
export default QuizResultModel;
