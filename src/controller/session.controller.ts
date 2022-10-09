import { Request, Response } from 'express';
import config from 'config';
import {
    createSession,
    findSessions,
    updateSession,
} from '../service/session.service';
import {
    findUserByEmail,
    findUserById,
    validatePassword,
} from '../service/user.service';
import { signJwt, verifyJwt } from '../utils/jwt.utils';
import { CreateSessionInput } from '../schema/session.schema';
import {
    findSessionById,
    signAccessToken,
    signRefreshToken,
} from '../service/auth.service';
import { get } from 'lodash';

export async function createUserSessionHandler(
    // eslint-disable-next-line @typescript-eslint/ban-types
    req: Request<{}, {}, CreateSessionInput>,
    res: Response
) {
    const message = 'Invalid email or password';
    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
        return res.send(message);
    }

    // if (!user.verified) {
    //     return res.send('Please verify your email');
    // }

    const isValid = await validatePassword({ email, password });

    if (!isValid) {
        return res.send(message);
    }

    // create a session
    // const session = await createSession(user._id, req.get('user-agent') || '');

    // sign a access token
    const accessToken = signAccessToken(user);

    // sign a refresh token
    const refreshToken = await signRefreshToken({ userId: user._id });

    // create an access token
    // const accessToken = signJwt(
    //     { ...user, session: session._id },
    //     'accessTokenPrivateKey',
    //     { expiresIn: config.get('accessTokenTtl') }
    // );

    // create a refresh token
    // const refreshToken = signJwt(
    //     { ...user, session: session._id },
    //     'refreshTokenPrivateKey',
    //     { expiresIn: config.get('refreshTokenTtl') }
    // );

    console.log(accessToken);
    return res.send({ accessToken, refreshToken });
}

export async function getUserSessionsHandler(req: Request, res: Response) {
    const userId = res.locals.user._id;

    const sessions = await findSessions({ user: userId, valid: true });

    return res.send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
    const sessionId = res.locals.user.session;

    await updateSession({ _id: sessionId }, { valid: false });

    return res.send({
        accessToken: null,
        refreshToken: null,
    });
}

export async function refreshAccessTokenHandler(req: Request, res: Response) {
    const refreshToken = get(req, 'headers.x-refresh');

    const decoded = verifyJwt<{ session: string }>(
        refreshToken,
        'refreshTokenPublicKey'
    );

    if (!decoded) {
        return res.status(401).send('Could not refresh access token');
    }

    const session = await findSessionById(decoded.session);

    if (!session || !session.valid) {
        return res.status(401).send('Could not refresh access token');
    }

    const user = await findUserById(String(session.user));

    if (!user) {
        return res.status(401).send('Could not refresh access token');
    }

    const accessToken = signAccessToken(user);

    return res.send({ accessToken });
}
