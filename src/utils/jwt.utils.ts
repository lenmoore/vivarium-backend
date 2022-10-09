import jwt from 'jsonwebtoken';
import config from 'config';

export function signJwt(
    object: object,
    keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
    options?: jwt.SignOptions | undefined
) {
    const signingKey = config.get(keyName).toString();

    return jwt.sign(object, signingKey, {
        ...(options && options),
        algorithm: 'RS256',
    });
}

export function verifyJwt(
    token: string,
    keyName: 'accessTokenPublicKey' | 'refreshTokenPublicKey'
) {
    const publicKey = Buffer.from(config.get<string>(keyName)).toString(
        'ascii'
    );

    try {
        const decoded = jwt.verify(token, publicKey);
        return {
            valid: true,
            expired: false,
            decoded,
        };
    } catch (e: any) {
        console.error(e);
        return {
            valid: false,
            expired: e.message === 'jwt expired',
            decoded: null,
        };
    }
}
