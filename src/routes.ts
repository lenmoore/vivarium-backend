import { Express, Request, Response } from 'express';
import cors from 'cors';
import { createUserHandler } from './controller/user.controller';
import validateResource from './middleware/validateResource';
import { createUserSchema } from './schema/user.schema';
import { createSessionSchema } from './schema/session.schema';
import {
    createUserSessionHandler,
    deleteSessionHandler,
    getUserSessionsHandler,
} from './controller/session.controller';
import requireUser from './middleware/requireUser';
import {
    createProductHandler,
    deleteProductHandler,
    getProductHandler,
    updateProductHandler,
} from './controller/humanity-shop/product.controller';
import {
    createProductSchema,
    deleteProductSchema,
    getProductSchema,
    updateProductSchema,
} from './schema/humanity-shop/product.schema';
import {
    createBasketSchema,
    deleteBasketSchema,
    getBasketSchema,
    updateBasketSchema,
} from './schema/humanity-shop/basket.schema';
import {
    createBasketHandler,
    deleteBasketHandler,
    getBasketHandler,
    updateBasketHandler,
} from './controller/humanity-shop/basket.controller';
import {
    createPerformanceSchema,
    getPerformanceSchema,
    updatePerformanceSchema,
} from './schema/performance/performance.schema';
import {
    createPerformanceHandler,
    deletePerformanceHandler,
    getPerformanceHandler,
    updatePerformanceHandler,
} from './controller/performance/performance.controller';

function routes(app: Express) {
    app.use(cors());
    app.get('/api/health-check', (req: Request, res: Response) => {
        res.sendStatus(200);
    });

    app.post(
        '/api/users',
        validateResource(createUserSchema),
        createUserHandler
    );

    app.post(
        '/api/sessions',
        validateResource(createSessionSchema),
        createUserSessionHandler
    );

    app.get('/api/sessions', requireUser, getUserSessionsHandler);

    app.delete('/api/sessions', requireUser, deleteSessionHandler);

    //    -------------------- admin stuff
    //    products
    app.post(
        '/api/products',
        [requireUser, validateResource(createProductSchema)],
        createProductHandler
    );
    app.get(
        '/api/products/:productId',
        validateResource(getProductSchema),
        getProductHandler
    );
    app.put(
        '/api/products/:productId',
        [requireUser, validateResource(updateProductSchema)],
        updateProductHandler
    );
    app.delete(
        '/api/products/:productId',
        [requireUser, validateResource(deleteProductSchema)],
        deleteProductHandler
    );

    app.post(
        '/api/performances',
        [requireUser, validateResource(createPerformanceSchema)],
        createPerformanceHandler
    );
    app.get(
        '/api/performances/:performanceId',
        validateResource(getPerformanceSchema),
        getPerformanceHandler
    );
    app.put(
        '/api/performances/:performanceId',
        [requireUser, validateResource(updatePerformanceSchema)],
        updatePerformanceHandler
    );
    app.delete(
        '/api/performances/:performanceId',
        [requireUser, validateResource(deleteBasketSchema)],
        deletePerformanceHandler
    );

    // todo add visitor routes/visitor-user logic

    //    ----------------------- regular stuff
    app.post(
        '/api/baskets',
        [requireUser, validateResource(createBasketSchema)],
        createBasketHandler
    );
    app.get(
        '/api/baskets/:basketId',
        validateResource(getBasketSchema),
        getBasketHandler
    );
    app.put(
        '/api/baskets/:basketId',
        [requireUser, validateResource(updateBasketSchema)],
        updateBasketHandler
    );
    app.delete(
        '/api/baskets/:basketId',
        [requireUser, validateResource(deleteBasketSchema)],
        deleteBasketHandler
    );
    //    todo add products to basket
    //    todo remove products from basket
}
export default routes;
