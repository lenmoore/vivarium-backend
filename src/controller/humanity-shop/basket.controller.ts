import { Request, Response } from 'express';
import {
    CreateBasketInput,
    DeleteBasketInput,
    ReadBasketByVisitorInput,
    ReadBasketInput,
    UpdateBasketInput,
} from '../../schema/humanity-shop/basket.schema';
import {
    createBasket,
    findAndUpdateBasket,
    findBasket,
    getAllBaskets,
} from '../../service/humanity-shop/basket.service';
import {
    deleteProduct,
    findAndUpdateProduct,
    findProduct,
} from '../../service/humanity-shop/product.service';
import { DeleteProductInput } from '../../schema/humanity-shop/product.schema';

export async function createBasketHandler(
    req: Request<CreateBasketInput>,
    res: Response
) {
    const userId = res.locals.user._id;

    const body = req.body;

    // todo add current performance to basket
    // const currentPerformance = findPerformance()

    const basket = await createBasket({ ...body, user: userId });

    return res.send(basket);
}

export async function updateBasketHandler(
    req: Request<UpdateBasketInput['params']>,
    res: Response
) {
    const userId = res.locals.user._id;

    const basketId = req.params.basketId;
    const update = req.body;

    const basket = await findBasket({ basketId });

    if (!basket) {
        return res.sendStatus(404);
    }

    // if (String(basket.user) !== userId) {
    //     return res.sendStatus(403);
    // }

    const updatedProduct = await findAndUpdateBasket({ basketId }, update, {
        new: true,
    });

    return res.send(updatedProduct);
}

export async function getBasketHandler(
    req: Request<ReadBasketInput['params']>,
    res: Response
) {
    const basketId = req.params.basketId;
    const basket = await findBasket({ basketId });

    if (!basket) {
        return res.sendStatus(404);
    }

    return res.send(basket);
}

export async function getBasketByVisitorIdHandler(
    req: Request<ReadBasketByVisitorInput['params']>,
    res: Response
) {
    const visitorId = req.params.visitorId;
    const basket = await findBasket({ visitorId });

    if (!basket) {
        return res.sendStatus(404);
    }

    return res.send(basket);
}

export async function getBasketsHandler(req: Request, res: Response) {
    const baskets = await getAllBaskets();
    if (!baskets) {
        return res.sendStatus(404);
    }
    return res.send(baskets);
}

export async function deleteBasketHandler(
    req: Request<DeleteBasketInput['params']>,
    res: Response
) {
    const userId = res.locals.user._id;
    const basketId = req.params.basketId;

    const basket = await findProduct({ basketId });
    console.log(basket);

    if (!basket) {
        return res.sendStatus(404);
    }

    if (String(basket.user) !== userId) {
        return res.sendStatus(403);
    }

    await deleteProduct({ basketId });

    return res.sendStatus(200);
}
