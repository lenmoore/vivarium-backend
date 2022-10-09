import { omit } from 'lodash';
import SessionModel from '../models/session.model';
import { signJwt } from '../utils/jwt.utils';
import { findUserById } from './user.service';
import { Document } from 'mongoose';
import { UserDocument } from '../models/user.model';

export async function createSession({ userId }: { userId: string }) {
    return SessionModel.create({ user: userId });
}

export async function findSessionById(id: string) {
    return SessionModel.findById(id);
}

export async function signRefreshToken({ userId }: { userId: string }) {
    const session = await createSession({
        userId,
    });

    const refreshToken = signJwt(
        {
            session: session._id,
        },
        'refreshTokenPrivateKey',
        {
            expiresIn: '1y',
        }
    );

    return refreshToken;
}

export function signAccessToken(user: UserDocument) {
    const payload = omit(user.toJSON());

    const accessToken = signJwt(payload, 'accessTokenPrivateKey', {
        expiresIn: '15m',
    });

    return accessToken;
}
