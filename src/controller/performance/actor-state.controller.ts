import { Request, Response } from 'express';
import { ReadVisitorInput } from '../../schema/performance/visitor.schema';
import { findVisitor } from '../../service/performance/visitor.service';
import VisitorModel from '../../models/performance/visitor.model';
import PerformanceModel from '../../models/performance/performance.model';
import ProductModel from '../../models/humanity-shop/product.model';
import { getAllProducts } from '../../service/humanity-shop/product.service';
import {
    CreateActorStateInput,
    ReadActorStateInput,
    UpdateActorStateInput,
} from '../../schema/performance/actor-state.schema';
import ActorStateModel from '../../models/performance/actor-schema.model';
import GameModel from '../../models/performance/game.model';

export async function getActorStateAudienceListHandler(
    req: Request,
    res: Response
) {
    try {
        const actorColor = req.query.colour;
        console.log(actorColor, ' get actor state -> visitors summary');
        const activePerformance = await PerformanceModel.find({ active: true });

        const filter: any = {};
        filter.performance = activePerformance;
        if (actorColor !== 'all') {
            filter.confirmed_humanity_value = actorColor;
        }
        const actorColorVisitors = await VisitorModel.find(filter)
            .populate({
                path: 'basket',
                populate: {
                    path: 'products',
                },
            })
            .populate({ path: 'quiz_results', populate: 'step' });

        return res.send(actorColorVisitors);
    } catch (err) {
        console.error(err);
        return res.sendStatus(400);
    }
}
export async function getActorStateProductsHandler(
    req: Request,
    res: Response
) {
    try {
        const actorColor = req.query.colour;
        console.log(actorColor, ' get actor state -> products');
        const activePerformance = await PerformanceModel.find({ active: true });

        const actorColorVisitors = await VisitorModel.find({
            confirmed_humanity_value: actorColor,
            performance: activePerformance,
        })
            .populate({
                path: 'basket',
                populate: {
                    path: 'products',
                },
            })
            .populate({ path: 'quiz_results', populate: 'step' });
        const products = await ProductModel.find();
        const allProductsEverSelected = [];
        let countedProducts = [];
        actorColorVisitors.forEach((visitor) => {
            const vis = visitor.toObject();
            vis.basket?.products?.forEach((p) => {
                allProductsEverSelected.push({
                    product: p,
                    visitor: vis.wardrobe_number,
                });
            });
        });

        products.forEach((product) => {
            const prod = product.toObject();

            const foundProducts = allProductsEverSelected.filter(
                (p) => p.product?.image === product?.image
            );
            const count = foundProducts.length;
            const visitorsWhoHaveThisProduct = foundProducts.map(
                (v) => v.visitor
            );
            if (!countedProducts?.find((cP) => cP?._id === prod?._id)) {
                countedProducts?.push({
                    ...prod,
                    count: count,
                    visitors: visitorsWhoHaveThisProduct,
                });
            }
        });

        countedProducts = countedProducts?.sort((a, b) => b.count - a.count);
        return res.send(countedProducts);
    } catch (err) {
        console.error(err);
        return res.sendStatus(400);
    }
}

export async function getActorStateHandler(
    req: Request<ReadActorStateInput>,
    res: Response
) {
    try {
        const actorColour = req.query.colour;
        console.log(actorColour);

        const actorColorVisitors = await ActorStateModel.findOne({
            colour: actorColour,
        });

        return res.send(actorColorVisitors);
    } catch (err) {
        console.error(err);
        return res.sendStatus(400);
    }
}
export async function createActorStateHandler(
    req: Request<CreateActorStateInput>,
    res: Response
) {
    try {
        const body = req.body;
        const actorColor = req.query.colour;
        console.log(actorColor);
        console.log(body);

        const result = await ActorStateModel.create(body);

        return res.send(result);
    } catch (err) {
        console.error(err);
        return res.sendStatus(400);
    }
}

export async function updateActorStateHandler(
    req: Request<UpdateActorStateInput>,
    res: Response
) {
    try {
        console.log(req);
        const actorColor = req.query.colour;
        console.log(actorColor);

        const actorColorVisitors = await VisitorModel.find({
            confirmed_humanity_value: actorColor,
        });

        return res.send(actorColorVisitors);
    } catch (err) {
        console.error(err);
        return res.sendStatus(400);
    }
}
