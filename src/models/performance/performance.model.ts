import mongoose, { Schema } from 'mongoose';
import { customAlphabet } from 'nanoid';
import { UserDocument } from '../user.model';
import { PhaseDocument } from './phase.model';
import { VisitorDocument } from './visitor.model';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);

export interface PerformanceInput {
    user: UserDocument['_id'];
    title: string;
    date: Date;
    location?: string;
    phases: Array<PhaseDocument>;
    visitors: Array<VisitorDocument>;
    are_visitors_in_groups: boolean;
}

export interface PerformanceDocument
    extends PerformanceInput,
        mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const performanceSchema = new mongoose.Schema(
    {
        performanceId: {
            type: String,
            required: true,
            unique: true,
            default: () => `performance_${nanoid()}`,
        },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'Performance' },
        visitors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Visitor' }],
        title: { type: String, required: true },
        date: { type: Date, required: true },
        location: { type: String, required: true },
        phases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Phase' }],
        active: { type: Boolean, default: false },
        are_visitors_in_groups: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

const PerformanceModel = mongoose.model<PerformanceDocument>(
    'Performance',
    performanceSchema
);

export default PerformanceModel;
