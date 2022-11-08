import { object, optional, string, boolean, TypeOf } from 'zod';

const payload = {
    body: object({
        name: string({
            required_error: 'name is required',
        }),
        phase_game: optional(string()),
        active: boolean({
            required_error: 'active is required',
        }),
        phase_start: optional(string()),
        phase_end: optional(string()),
    }),
};

const params = {
    params: object({
        phaseId: string({
            required_error: 'id is required',
        }),
    }),
};

export const createPhaseSchema = object({
    ...payload,
});

export const updatePhaseSchema = object({
    ...payload,
    ...params,
});

export const deletePhaseSchema = object({
    ...params,
});

export const getPhaseSchema = object({
    ...params,
});

export type CreatePhaseInput = TypeOf<typeof createPhaseSchema>;
export type UpdatePhaseInput = TypeOf<typeof updatePhaseSchema>;
export type DeletePhaseInput = TypeOf<typeof deletePhaseSchema>;
export type ReadPhaseInput = TypeOf<typeof getPhaseSchema>;
