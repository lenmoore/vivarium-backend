import { customAlphabet } from 'nanoid';
import mongoose from 'mongoose';
import { GameDocument } from './game.model';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);

export interface PhaseInput {
    name: string;
    phase_game: GameDocument['_id'];
    active: boolean;
    phase_start?: Date;
    phase_end?: Date;
}

export interface PhaseDocument extends PhaseInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const phaseSchema = new mongoose.Schema(
    {
        phaseId: {
            type: String,
            required: true,
            unique: true,
            default: () => `phase_${nanoid()}`,
        },
        name: { type: String, required: true },
        phase_game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
        phase_start: { type: Date, required: false },
        phase_end: { type: Date, required: false },
    },
    {
        timestamps: true,
    }
);
const PhaseModel = mongoose.model<PhaseDocument>('Phase', phaseSchema);

export default PhaseModel;
