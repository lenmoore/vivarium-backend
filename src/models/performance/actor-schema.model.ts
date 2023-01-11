// these are basically quiz type questions i guess
import mongoose from 'mongoose';
import { customAlphabet } from 'nanoid';
import { array, object } from 'zod';
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);

export class Timer {
    name: string;
    minutes: number;
    startTime?: Date;
}
export interface ActorStateInput {
    colour: string;
    timers: Array<Timer>;
}

export interface StepDocument extends ActorStateInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}
const actorStateSchema = new mongoose.Schema(
    {
        actorStateId: {
            type: String,
            required: true,
            unique: true,
            default: () => `state_${nanoid()}`,
        },
        timers: [{}],
        colour: { type: String, default: 'all' },
        phases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Phase' }],
    },
    {
        timestamps: true,
    }
);

const ActorStateModel = mongoose.model<StepDocument>(
    'ActorState',
    actorStateSchema
);

export default ActorStateModel;
