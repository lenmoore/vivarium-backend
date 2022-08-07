import mongoose from 'mongoose';
import { UserDocument } from './user.model';

export interface SessionDocument extends mongoose.Document {
    user: UserDocument['_id'];
    valid: boolean;
    userAgent: string;
    createdAt: Date;
    updatedAt: Date;
    isAdmin: UserDocument['admin'];
}

const sessionSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        valid: { type: Boolean, default: true },
        isAdmin: { type: Boolean },
        userAgent: { type: String },
    },
    {
        timestamps: true,
    }
);

const SessionModel = mongoose.model<SessionDocument>('Session', sessionSchema);

export default SessionModel;
