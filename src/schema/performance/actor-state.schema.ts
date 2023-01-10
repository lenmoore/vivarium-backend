import { array, number, object, string, TypeOf } from 'zod';

const payload = {
    body: object({
        colour: string({
            required_error: 'colour',
        }),
        timers: array(object({ name: string(), minutes: number() })),
    }),
};

const params = {
    params: object({
        colour: string({
            required_error: 'colour',
        }),
    }),
};

export const createActorStateSchema = object({
    ...payload,
});

export const updateActorStateSchema = object({
    ...payload,
    ...params,
});

export const deleteActorStateSchema = object({
    ...params,
});

export const getActorStateSchema = object({
    ...params,
});

export type CreateActorStateInput = TypeOf<typeof createActorStateSchema>;
export type UpdateActorStateInput = TypeOf<typeof updateActorStateSchema>;
export type DeleteActorStateInput = TypeOf<typeof deleteActorStateSchema>;
export type ReadActorStateInput = TypeOf<typeof getActorStateSchema>;
