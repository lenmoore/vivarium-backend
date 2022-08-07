import { object, string, TypeOf, optional } from 'zod';

const payload = {
    body: object({}),
};

const params = {
    params: object({
        basketId: string({
            required_error: 'basketId is required',
        }),
    }),
};

export const createBasketSchema = object({
    ...payload,
});

export const updateBasketSchema = object({
    ...payload,
    ...params,
});

export const deleteBasketSchema = object({
    ...params,
});

export const getBasketSchema = object({
    ...params,
});

export type CreateBasketInput = TypeOf<typeof createBasketSchema>;
export type UpdateBasketInput = TypeOf<typeof updateBasketSchema>;
export type ReadBasketInput = TypeOf<typeof getBasketSchema>;
export type DeleteBasketInput = TypeOf<typeof deleteBasketSchema>;
