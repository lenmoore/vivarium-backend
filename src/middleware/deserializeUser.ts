import { get } from 'lodash';
import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt.utils';
import { reIssueAccessToken } from '../service/session.service';

const deserializeUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const accessToken = get(req, 'headers.authorization').replace(
            /^Bearer\s/,
            ''
        );

        const refreshToken = get(req, 'headers.x-refresh');

        if (!accessToken) {
            console.log('!accesstoken');
            return next();
        }
        console.log('decoded');
        const decoded = verifyJwt(accessToken, 'accessTokenPublicKeyEncoded');
        if (decoded) {
            res.locals.user = decoded;
            console.log('locals user', res.locals.user);
            return next();
        }

        const expired = true;

        if (expired && refreshToken) {
            const newAccessToken = await reIssueAccessToken({ refreshToken });

            if (newAccessToken) {
                res.setHeader('x-access-token', newAccessToken);
            }

            const result = verifyJwt(
                newAccessToken as string,
                'accessTokenPublicKeyEncoded'
            );

            console.log('this-.result ', result);
            res.locals.user = result;
            return next();
        }
    } catch (e) {
        console.error(e);
    }

    return next();
};

export default deserializeUser;
