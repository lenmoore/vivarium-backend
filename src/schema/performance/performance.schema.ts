import { object, number, string, TypeOf, optional } from 'zod';

const payload = {
    body: object({
        title: string({
            required_error: 'title is required',
        }),
        location: optional(string()),
        date: string({
            required_error: 'date is required',
        }),
    }),
};

const params = {
    params: object({
        performanceId: string({
            required_error: 'performanceId is required',
        }),
    }),
};

export const createPerformanceSchema = object({
    ...payload,
});

export const updatePerformanceSchema = object({
    ...payload,
    ...params,
});

export const deletePerformanceSchema = object({
    ...params,
});

export const getPerformanceSchema = object({
    ...params,
});

export type CreatePerformanceInput = TypeOf<typeof createPerformanceSchema>;
export type UpdatePerformanceInput = TypeOf<typeof updatePerformanceSchema>;
export type ReadPerformanceInput = TypeOf<typeof getPerformanceSchema>;
export type DeletePerformanceInput = TypeOf<typeof deletePerformanceSchema>;
