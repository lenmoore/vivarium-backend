import { Request, Response } from 'express';
import {
    CreateProductInput,
    DeleteProductInput,
    ReadProductInput,
    UpdateProductInput,
} from '../../schema/humanity-shop/product.schema';
import {
    createProduct,
    deleteProduct,
    findAndUpdateProduct,
    findProduct,
    getAllProducts,
} from '../../service/humanity-shop/product.service';
import { getAllPerformances } from '../../service/performance/performance.service';

export async function createProductHandler(
    req: Request<CreateProductInput>,
    res: Response
) {
    try {
        const userId = res.locals.user._id;

        const body = req.body;

        const product = await createProduct({ ...body, user: userId });

        return res.send(product);
    } catch (e) {
        console.error(e);
    }
}
export async function updateProductHandler(
    req: Request<UpdateProductInput['params']>,
    res: Response
) {
    try {
        const productId = req.params.productId;
        const update = req.body;

        const product = await findProduct({ productId });

        if (!product) {
            return res.sendStatus(404);
        }
        const updatedProduct = await findAndUpdateProduct(
            { productId },
            update,
            {
                new: true,
            }
        );

        return res.send(updatedProduct);
    } catch (e) {
        console.error(e);
    }
}

export async function getProductHandler(
    req: Request<ReadProductInput['params']>,
    res: Response
) {
    try {
        const productId = req.params.productId;
        const product = await findProduct({ _id: productId });

        if (!product) {
            return res.sendStatus(404);
        }

        return res.send(product);
    } catch (e) {
        console.error(e);
    }
}

export async function getProductsHandler(req: Request, res: Response) {
    try {
        const products = await getAllProducts();

        if (!products) {
            return res.sendStatus(404);
        }

        return res.send(products);
    } catch (e) {
        console.error(e);
    }
}

export async function deleteProductHandler(
    req: Request<DeleteProductInput['params']>,
    res: Response
) {
    try {
        const userId = res.locals.user._id;
        const productId = req.params.productId;

        const product = await findProduct({ productId });

        if (!product) {
            return res.sendStatus(404);
        }

        if (String(product.user) !== userId) {
            return res.sendStatus(403);
        }

        await deleteProduct({ productId });

        return res.sendStatus(200);
    } catch (e) {
        console.error(e);
    }
}
