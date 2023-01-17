import { omit } from 'lodash';
import SessionModel, { SessionDocument } from '../models/session.model';
import { signJwt, signVisitorJwt } from '../utils/jwt.utils';
import { findUserById } from './user.service';
import { Document, FilterQuery, UpdateQuery } from 'mongoose';
import { UserDocument } from '../models/user.model';

export async function createSession({ userId }: { userId: string }) {
    return SessionModel.create({ user: userId });
}

export async function findSessionById(id: unknown) {
    return SessionModel.findById(id);
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
    return SessionModel.find(query).lean();
}

export async function updateSession(
    query: FilterQuery<SessionDocument>,
    update: UpdateQuery<SessionDocument>
) {
    return SessionModel.updateOne(query, update);
}
export async function signRefreshToken({ userId }: { userId: string }) {
    const session = await createSession({
        userId,
    });

    const refreshToken = await signJwt(
        {
            session: session._id,
        },
        'refreshTokenPrivateKeyEncoded',
        {
            expiresIn: '1y',
        }
    );

    // console.log('signed refresh token', refreshToken);

    return refreshToken;
}

export async function signAccessToken(user: UserDocument) {
    const payload = user.toJSON();
    // console.log(user);

    const accessToken = await signJwt(payload, 'accessTokenPrivateKeyEncoded');

    // console.log('signed accessToken', accessToken);

    return accessToken;
}

export async function signVisitorAccessToken(visitor: any) {
    const payload = visitor;
    // console.log(visitor);

    const accessToken = await signVisitorJwt(
        payload,
        'accessTokenPrivateKeyEncoded'
    );

    // console.log('signed accessToken', accessToken);

    return accessToken;
}
