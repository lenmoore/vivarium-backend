import { get } from 'lodash';
import config from 'config';
import { FilterQuery, UpdateQuery } from 'mongoose';
import SessionModel, { SessionDocument } from '../models/session.model';
import { verifyJwt, signJwt } from '../utils/jwt.utils';
import { findUser } from './user.service';

export async function createSession(userId: string, userAgent: string) {
    const session = await SessionModel.create({ user: userId, userAgent });

    return session.toJSON();
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

export async function reIssueAccessToken({
    refreshToken,
}: {
    refreshToken: string;
}) {
    const decoded = await verifyJwt(
        refreshToken,
        'refreshTokenPublicKeyEncoded'
    );

    if (!decoded || !get(decoded, 'session')) return false;

    const session = await SessionModel.findById(get(decoded, 'session'));

    if (!session || !session.valid) return false;

    const user = await findUser({ _id: session.user });

    if (!user) return false;

    const accessToken = await signJwt(
        { ...user, session: session._id },
        'accessTokenPrivateKeyEncoded'
    );

    // console.log('NEW ACCESS TOKEN > ', accessToken);

    return accessToken;
}
