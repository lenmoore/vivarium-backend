import { object, string, TypeOf, optional, number, boolean } from 'zod';

const payload = {
    body: object({
        username: string({
            required_error: 'username is required',
        }),
        wardrobe_number: number({
            required_error: 'wardrobe number is required',
        }),
        wants_newsletter: boolean({
            required_error: 'newsletter info is required',
        }),
        wants_summary: boolean({
            required_error: 'summary info is required',
        }),
        basket: optional(
            object({
                basket_id: string(),
            })
        ),
        performance: optional(string()),
    }),
};

const params = {
    params: object({
        visitorId: string({
            required_error: 'visitorId is required',
        }),
        basket: optional(
            object({
                basket_id: string(),
            })
        ),
        performance: optional(
            object({
                performance_id: string(),
            })
        ),
    }),
};

export const createVisitorSchema = object({
    ...payload,
});

export const updateVisitorSchema = object({
    ...payload,
    ...params,
});

export const deleteVisitorSchema = object({
    ...params,
});

export const getVisitorSchema = object({
    ...params,
});

export type CreateVisitorInput = TypeOf<typeof createVisitorSchema>;
export type UpdateVisitorInput = TypeOf<typeof updateVisitorSchema>;
export type ReadVisitorInput = TypeOf<typeof getVisitorSchema>;
export type DeleteVisitorInput = TypeOf<typeof deleteVisitorSchema>;
