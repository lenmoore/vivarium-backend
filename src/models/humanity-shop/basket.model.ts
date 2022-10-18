import mongoose from 'mongoose';
import { customAlphabet } from 'nanoid';
import { UserDocument } from '../user.model';
import { ProductDocument } from './product.model';
import { VisitorDocument } from '../performance/visitor.model';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);

export interface BasketInput {
    user: UserDocument['_id'];
    visitor: VisitorDocument['_id'];
    products: Array<ProductDocument>;
    coins_left: number;
}

export interface BasketDocument extends BasketInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const basketSchema = new mongoose.Schema(
    {
        basketId: {
            type: String,
            required: true,
            unique: true,
            default: () => `basket_${nanoid()}`,
        },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        visitor: { type: mongoose.Schema.Types.ObjectId, ref: 'Visitor' },
        products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
        coins_left: Number,
    },
    {
        timestamps: true,
    }
);

const BasketModel = mongoose.model<BasketDocument>('Basket', basketSchema);

export default BasketModel;
