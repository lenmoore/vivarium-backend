import { Request, Response } from 'express';
import { get } from 'lodash';

import {
    findSessionById,
    signAccessToken,
    signRefreshToken,
} from '../service/auth.service';
import {
    findUserByEmail,
    findUserById,
    validatePassword,
} from '../service/user.service';
import { CreateSessionInput } from '../schema/session.schema';
import { verifyJwt } from '../utils/jwt.utils';

export async function createSessionHandler(
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

    // sign a access token
    const accessToken = signAccessToken(user);

    // sign a refresh token
    const refreshToken = await signRefreshToken({ userId: user._id });

    // send the tokens

    return res.send({
        accessToken,
        refreshToken,
    });
}

export async function refreshAccessTokenHandler(req: Request, res: Response) {
    const refreshToken = get(req, 'headers.x-refresh');

    const decoded = verifyJwt<{ session: string }>(
        refreshToken,
        'refreshTokenPublicKeyEncoded'
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
