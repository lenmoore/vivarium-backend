// these are basically quiz type questions i guess
import mongoose from 'mongoose';
import { customAlphabet } from 'nanoid';
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);

export interface StepInput {
    question_text: '';
    question_options?: Array<Option>;
}

export interface StepDocument extends StepInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}
export class Option {
    option_text: '';
    humanity_values: {
        lime: 0;
        fuchsia: 0;
        silver: 0;
        turq: 0;
    };
}
const stepSchema = new mongoose.Schema(
    {
        stepId: {
            type: String,
            required: true,
            unique: true,
            default: () => `step_${nanoid()}`,
        },
        question_text: { type: String, required: true },
        question_options: { type: [], default: [] },
    },
    {
        timestamps: true,
    }
);

const StepModel = mongoose.model<StepDocument>('Step', stepSchema);

export default StepModel;
