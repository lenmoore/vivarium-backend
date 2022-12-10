import { customAlphabet } from 'nanoid';
import { VisitorDocument } from './visitor.model';
import mongoose, { mongo } from 'mongoose';
import { GameDocument } from './game.model';
import { StepDocument } from './step.model';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);

export interface QuizResultInput {
    visitor: VisitorDocument['_id'];
    game: GameDocument['_id'];
    step: StepDocument['_id'];
    result_text: '';
    result_humanity_values: {
        green: 0;
        red: 0;
        blue: 0;
        orange: 0;
    };
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
    step: { type: mongoose.Schema.Types.ObjectId, ref: 'Step' },
    result_text: { type: String, required: true },
    result_humanity_values: { type: Object, required: true },
});

const QuizResultModel = mongoose.model<QuizResultDocument>(
    'QuizResult',
    quizResultSchema
);
export default QuizResultModel;
