import { object, optional, string, TypeOf } from 'zod';

const payload = {
    body: object({}),
};

const params = {
    params: object({
        gameId: string({
            required_error: 'gameId is required',
        }),
    }),
};

export const createGameSchema = object({
    ...payload,
});

export const updateGameSchema = object({
    ...payload,
    ...params,
});

export const deleteGameSchema = object({
    ...params,
});

export const getGameSchema = object({
    ...params,
});

export type CreateGameInput = TypeOf<typeof createGameSchema>;
export type UpdateGameInput = TypeOf<typeof updateGameSchema>;
export type DeleteGameInput = TypeOf<typeof deleteGameSchema>;
export type ReadGameInput = TypeOf<typeof getGameSchema>;
