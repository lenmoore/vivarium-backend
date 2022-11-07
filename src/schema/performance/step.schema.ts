import { object, optional, string, TypeOf } from 'zod';

const payload = {
    body: object({}),
};

const params = {
    params: object({
        stepId: string({
            required_error: 'stepId is required',
        }),
    }),
};

export const createStepSchema = object({
    ...payload,
});

export const updateStepSchema = object({
    ...payload,
    ...params,
});

export const deleteStepSchema = object({
    ...params,
});

export const getStepSchema = object({
    ...params,
});

export type CreateStepInput = TypeOf<typeof createStepSchema>;
export type UpdateStepInput = TypeOf<typeof updateStepSchema>;
export type DeleteStepInput = TypeOf<typeof deleteStepSchema>;
export type ReadStepInput = TypeOf<typeof getStepSchema>;
