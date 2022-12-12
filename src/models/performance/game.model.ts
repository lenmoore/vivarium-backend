import { customAlphabet } from 'nanoid';
import mongoose, { mongo } from 'mongoose';
import { StepDocument } from './step.model';
import { VisitorDocument } from './visitor.model';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);
export enum GAMETYPE {
    QUIZ = 'QUIZ',
    HUMANITY_SHOP = 'SHOP',
}

export interface GameInput {
    name: string;
    pre_capsule: boolean;
    open_for_colors: Array<string>;
    game_type: GAMETYPE;
    game_steps?: Array<StepDocument>;
    game_players?: Array<VisitorDocument>;
}
export interface GameDocument extends GameInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const gameSchema = new mongoose.Schema(
    {
        gameId: {
            type: String,
            required: true,
            unique: true,
            default: () => `game_${nanoid()}`,
        },
        name: { type: String, required: true },
        game_type: { type: String, default: GAMETYPE.QUIZ },
        game_steps: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Step' }],
        game_players: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'Visitor' },
        ],
        open_for_colors: [{ type: String, default: 'all' }],
        pre_capsule: { type: Boolean, default: true },
    },
    {
        timestamps: true,
    }
);

const GameModel = mongoose.model<GameDocument>('Game', gameSchema);

export default GameModel;
