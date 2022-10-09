import jwt from 'jsonwebtoken';
import config from 'config';

export function signJwt(
    // eslint-disable-next-line @typescript-eslint/ban-types
    object: Object,
    keyName: 'accessTokenPrivateKeyEncoded' | 'refreshTokenPrivateKeyEncoded',
    options?: jwt.SignOptions | undefined
) {
    const signingKey = Buffer.from(
        config.get<string>(keyName),
        'base64'
    ).toString('ascii');
    return jwt.sign(object, signingKey, {
        ...(options && options),
        algorithm: 'RS256',
    });
}

export function verifyJwt<T>(
    token: string,
    keyName: 'accessTokenPublicKeyEncoded' | 'refreshTokenPublicKeyEncoded'
): T | null {
    const publicKey = Buffer.from(
        config.get<string>(keyName),
        'base64'
    ).toString('ascii');
    try {
        const decoded = jwt.verify(token, publicKey) as T;
        console.log('decoded');
        console.log(decoded);
        return decoded;
    } catch (e) {
        return null;
    }
}

// import jwt from 'jsonwebtoken';
// import config from 'config';
//
// export function signJwt(
//     // eslint-disable-next-line @typescript-eslint/ban-types
//     object: Object,
//     keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
//     options?: jwt.SignOptions | undefined
// ) {
//     let signingKey = config.get<string>(keyName).toString();
//     signingKey = Buffer.from(signingKey, 'base64url').toString();
//
//     return jwt.sign(object, signingKey, {
//         ...(options && options),
//     });
// }
//
// export function verifyJwt(
//     token: string,
//     keyName: 'accessTokenPublicKey' | 'refreshTokenPublicKey'
// ): any {
//     console.log('verify jwt', token);
//     let publicKey = config.get<string>(keyName).toString();
//
//     publicKey = Buffer.from(publicKey, 'base64url').toString();
//     try {
//         const decoded = jwt.verify(token, publicKey);
//
//         console.log('decoded', decoded);
//         return decoded;
//     } catch (e) {
//         console.log(e);
//         return null;
//     }
// }
