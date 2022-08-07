import { Express, Request, Response } from 'express';
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

function routes(app: Express) {
    app.get('/health-check', (req: Request, res: Response) => {
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
}
export default routes;
