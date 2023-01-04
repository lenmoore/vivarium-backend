import mongoose, { Schema } from 'mongoose';
import { customAlphabet } from 'nanoid';
import { UserDocument } from '../user.model';
import { BasketDocument } from '../humanity-shop/basket.model';
import { PerformanceDocument } from './performance.model';
import { QuizResultDocument } from './quiz-results.model';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);

export interface VisitorInput {
    user: UserDocument['_id'];
    basket: BasketDocument['_id'];
    performance: PerformanceDocument['_id'];
    quiz_results: Array<QuizResultDocument>;
    username: string;
    humanity_values: object;
    archived: boolean;
    wardrobe_number: number;
    wants_newsletter: boolean;
    confirmed_humanity_value: string;
}

export interface VisitorDocument extends VisitorInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
    accessToken: string;
}

const visitorSchema = new mongoose.Schema(
    {
        visitorId: {
            type: String,
            required: true,
            unique: true,
            default: () => `visitor_${nanoid()}`,
        },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        humanity_values: {
            green: Number,
            fuchsia: Number,
            blue: Number,
            orange: Number,
        },
        archived: { type: Boolean, default: false },
        basket: { type: mongoose.Schema.Types.ObjectId, ref: 'Basket' },
        performance: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Performance',
        },
        username: { type: String, required: false },
        wardrobe_number: { type: Number, required: true },
        wants_newsletter: { type: Boolean, required: true },
        quiz_results: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'QuizResult' },
        ],
        accessToken: { type: String, default: '' },
        confirmed_humanity_value: { type: String, default: 'none' },
    },
    {
        timestamps: true,
    }
);
const VisitorModel = mongoose.model<VisitorDocument>('Visitor', visitorSchema);

export default VisitorModel;
