import mongoose, { Schema } from 'mongoose';
import { customAlphabet } from 'nanoid';
import { UserDocument } from '../user.model';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);

export interface ProductInput {
    user: UserDocument['_id'];
    title: string;
    description: string;
    price: number;
    image: string;
    humanity_values: object;
    archived: boolean;
    qr_code: string;
}

export interface ProductDocument extends ProductInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const productSchema = new mongoose.Schema(
    {
        productId: {
            type: String,
            required: true,
            unique: true,
            default: () => `product_${nanoid()}`,
        },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        title: { type: String, required: true },
        description: { type: String, required: false },
        qr_code: { type: String, required: false },
        price: { type: Number, required: true },
        image: { type: String, required: false },
        humanity_values: {
            lime: { average: Number, entries: [] },
            fuchsia: { average: Number, entries: [] },
            silver: { average: Number, entries: [] },
            turq: { average: Number, entries: [] },
        },
        archived: { type: Boolean, required: false },
    },
    {
        timestamps: true,
    }
);
const ProductModel = mongoose.model<ProductDocument>('Product', productSchema);

export default ProductModel;
