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

    // sign an access token
    const accessToken = await signAccessToken(user);

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

    const { payload, protectedHeader } = await verifyJwt(
        refreshToken[0],
        'refreshTokenPublicKeyEncoded'
    );

    const decoded = payload;
    if (!decoded) {
        return res.status(401).send('Could not refresh access token');
    }

    console.log(decoded);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const session = await findSessionById((await decoded).payload.session);

    if (!session || !session.valid) {
        return res.status(401).send('Could not refresh access token');
    }

    const user = await findUserById(String(session.user));

    if (!user) {
        return res.status(401).send('Could not refresh access token');
    }

    const accessToken = await signAccessToken(user);

    return res.send({ accessToken });
}
