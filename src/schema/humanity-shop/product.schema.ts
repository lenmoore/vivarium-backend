import { object, number, string, TypeOf, optional } from 'zod';

const payload = {
    body: object({
        title: string({
            required_error: 'title is required',
        }),
        description: string({
            required_error: 'description is required',
        }),
        price: number({
            required_error: 'price is required',
        }),
        image: string({
            required_error: 'image is required',
        }),
        humanity_values: optional(
            object({
                lime: number(),
                fuchsia: number(),
                silver: number(),
                turq: number(),
            })
        ),
    }),
};

const params = {
    params: object({
        productId: string({
            required_error: 'productId is required',
        }),
    }),
};

export const createProductSchema = object({
    ...payload,
});

export const updateProductSchema = object({
    ...payload,
    ...params,
});

export const deleteProductSchema = object({
    ...params,
});

export const getProductSchema = object({
    ...params,
});

export type CreateProductInput = TypeOf<typeof createProductSchema>;
export type UpdateProductInput = TypeOf<typeof updateProductSchema>;
export type ReadProductInput = TypeOf<typeof getProductSchema>;
export type DeleteProductInput = TypeOf<typeof deleteProductSchema>;
