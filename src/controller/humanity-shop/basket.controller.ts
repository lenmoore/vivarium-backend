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
    try {
        const userId = res.locals.user._id;

        const body = req.body;

        // todo add current performance to basket
        // const currentPerformance = findPerformance()

        const basket = await createBasket({ ...body, user: userId });

        return res.send(basket);
    } catch (e) {
        console.error(e);
    }
}

export async function updateBasketHandler(
    req: Request<UpdateBasketInput['params']>,
    res: Response
) {
    try {
        console.log(req.params);
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
    } catch (e) {
        console.error(e);
        return res.sendStatus(400);
    }
}

export async function getBasketHandler(
    req: Request<ReadBasketInput['params']>,
    res: Response
) {
    try {
        const basketId = req.params.basketId;
        const basket = await findBasket({ basketId });

        if (!basket) {
            return res.sendStatus(404);
        }

        return res.send(basket);
    } catch (e) {
        console.error(e);
    }
}

export async function getBasketByVisitorIdHandler(
    req: Request<ReadBasketByVisitorInput['params']>,
    res: Response
) {
    try {
        const visitorId = req.params.visitorId;
        console.log(visitorId);
        const basket = await findBasket({ visitor: visitorId });

        if (!basket) {
            return res.sendStatus(404);
        }

        return res.send(basket);
    } catch (e) {
        console.error(e);
    }
}

export async function getBasketsHandler(req: Request, res: Response) {
    try {
        const baskets = await getAllBaskets();
        if (!baskets) {
            return res.sendStatus(404);
        }
        return res.send(baskets);
    } catch (e) {
        console.error(e);
    }
}

export async function deleteBasketHandler(
    req: Request<DeleteBasketInput['params']>,
    res: Response
) {
    try {
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
    } catch (e) {
        console.error(e);
    }
}
