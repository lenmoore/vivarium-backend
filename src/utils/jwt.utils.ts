import config from 'config';
import * as jose from 'jose';
import { JWTPayload, JWTVerifyResult } from 'jose';

export async function signJwt(
    object: JWTPayload,
    keyName: 'accessTokenPrivateKeyEncoded' | 'refreshTokenPrivateKeyEncoded',
    options?: any | undefined
) {
    const signingKey = Buffer.from(config.get(keyName));

    console.log('im trying to sign this:', object);
    const signed = await new jose.SignJWT(object)
        .setExpirationTime(config.get('accessTokenTtl'))
        .setProtectedHeader({ alg: 'HS256' })
        .sign(signingKey);

    console.log(signed);
    return signed;
}

export async function signVisitorJwt(
    object: JWTPayload,
    keyName: 'accessTokenPrivateKeyEncoded' | 'refreshTokenPrivateKeyEncoded',
    options?: any | undefined
) {
    try {
        const signingKey = Buffer.from(config.get(keyName));
        console.log('im trying to sign this visitors token', object);
        const signed = await new jose.SignJWT(object)
            .setExpirationTime('1d')
            .setProtectedHeader({ alg: 'HS256' })
            .sign(signingKey);

        console.log(signed);
        return signed;
    } catch (e) {
        console.error(e);
    }
}

export async function verifyJwt(
    token: string,
    keyName: 'accessTokenPublicKeyEncoded' | 'refreshTokenPublicKeyEncoded'
): Promise<JWTVerifyResult> {
    const publicKey = Buffer.from(config.get<string>(keyName));
    try {
        const { payload, protectedHeader } = await jose.jwtVerify(
            token,
            publicKey,
            {}
        );
        console.log(payload);
        console.log(protectedHeader);
        return { payload, protectedHeader };
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
