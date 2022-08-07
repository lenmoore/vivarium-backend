import mongoose, { Schema } from 'mongoose';
import { customAlphabet } from 'nanoid';
import { UserDocument } from '../user.model';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);

export interface VisitorInput {
    user: UserDocument['_id'];
    username: string;
    humanity_values: object;
    archived: boolean;
    wardrobe_number: number;
    wants_newsletter: boolean;
    wants_summary: boolean;
}

export interface VisitorDocument extends VisitorInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const visitorSchema = new mongoose.Schema(
    {
        visitorId: {
            type: String,
            required: true,
            unique: true,
            default: () => `visitor_${nanoid()}`,
        },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'Visitor' },
        humanity_values: {
            eco_warrior: Number,
            humanist: Number,
            estonian_spiritualist: Number,
            traditionalist: Number,
        },
        archived: { type: Boolean, required: false },
        basket: { type: mongoose.Types.ObjectId, ref: 'Basket' },
        performance: { type: mongoose.Types.ObjectId, ref: 'Performance' },
        username: { type: String, required: false },
        wardrobe_number: { type: Number, required: true },
        wants_newsletter: { type: Boolean, required: true },
        wants_summary: { type: Boolean, required: true },
    },
    {
        timestamps: true,
    }
);
const VisitorModel = mongoose.model<VisitorDocument>('Visitor', visitorSchema);

export default VisitorModel;
