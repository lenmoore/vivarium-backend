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
    const userId = res.locals.user._id;

    const body = req.body;

    const product = await createProduct({ ...body, user: userId });

    return res.send(product);
}
export async function updateProductHandler(
    req: Request<UpdateProductInput['params']>,
    res: Response
) {
    const userId = res.locals.user._id;

    const productId = req.params.productId;
    const update = req.body;

    const product = await findProduct({ productId });

    if (!product) {
        return res.sendStatus(404);
    }

    if (String(product.user) !== userId) {
        return res.sendStatus(403);
    }

    const updatedProduct = await findAndUpdateProduct({ productId }, update, {
        new: true,
    });

    return res.send(updatedProduct);
}

export async function getProductHandler(
    req: Request<ReadProductInput['params']>,
    res: Response
) {
    console.log(req.params);
    const productId = req.params.productId;
    const product = await findProduct({ _id: productId });

    if (!product) {
        return res.sendStatus(404);
    }

    return res.send(product);
}

export async function getProductsHandler(req: Request, res: Response) {
    const products = await getAllProducts();

    if (!products) {
        return res.sendStatus(404);
    }

    return res.send(products);
}

export async function deleteProductHandler(
    req: Request<DeleteProductInput['params']>,
    res: Response
) {
    console.log('jou');
    const userId = res.locals.user._id;
    const productId = req.params.productId;

    const product = await findProduct({ productId });
    console.log(product);

    if (!product) {
        return res.sendStatus(404);
    }

    if (String(product.user) !== userId) {
        return res.sendStatus(403);
    }

    await deleteProduct({ productId });

    return res.sendStatus(200);
}
