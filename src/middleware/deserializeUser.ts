import { get } from 'lodash';
import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt.utils';
import { reIssueAccessToken } from '../service/session.service';
import jwt from 'jsonwebtoken';
import * as jose from 'jose';
import config from 'config';

const deserializeUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const accessToken = req.headers.authorization?.split(' ')[1];
        const refreshToken = get(req, 'headers.x-refresh');

        if (!accessToken) {
            return next();
        }

        const decoded = await jose.decodeJwt(accessToken);

        if (decoded) {
            res.locals.user = {
                username: decoded.email,
                name: decoded.name || decoded.email,
            };

            return next();
        }

        const { exp } = jwt.decode(accessToken) as {
            exp: number;
        };
        const expirationDatetimeInSeconds = exp * 1000;

        const isExpired = Date.now() >= expirationDatetimeInSeconds;

        console.log('is expired? ', isExpired);
        if (exp && isExpired && refreshToken) {
            const newAccessToken = await reIssueAccessToken({ refreshToken });

            if (newAccessToken) {
                res.setHeader('x-access-token', newAccessToken);
            }
            // if (newAccessToken) {
            //     res.setHeader('authorization', newAccessToken);
            // }

            const result = jose.decodeJwt(accessToken);

            res.locals.user = {
                username: result.email,
                name: result.name || result.email,
            };
            return next();
        }
    } catch (e) {
        console.error(e);
    }

    return next();
};

export default deserializeUser;
