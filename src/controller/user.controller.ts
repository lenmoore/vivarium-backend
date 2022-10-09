import { Request, Response } from 'express';
import { omit } from 'lodash';
import { CreateUserInput } from '../schema/user.schema';
import { createUser, findUserById } from '../service/user.service';
import logger from '../utils/logger';

export async function createUserHandler(
    // eslint-disable-next-line @typescript-eslint/ban-types
    req: Request<{}, {}, CreateUserInput['body']>,
    res: Response
) {
    try {
        const user = await createUser(req.body);
        return res.send(user);
    } catch (e: any) {
        logger.error(e);
        return res.status(409).send(e.message);
    }
}

export async function getCurrentUserHandler(req: Request, res: Response) {
    return res.send(res.locals.user);
}

// todo non-mvp user handling -- verifying by email, password reset
// export async function verifyUserHandler(
//     req: Request<VerifyUserInput>,
//     res: Response
// ) {
//     const id = req.params.id;
//     const verificationCode = req.params.verificationCode;
//
//     // find the user by id
//     const user = await findUserById(id);
//
//     if (!user) {
//         return res.send('Could not verify user');
//     }
//
//     // check to see if they are already verified
//     if (user.verified) {
//         return res.send('User is already verified');
//     }
//
//     // check to see if the verificationCode matches
//     if (user.verificationCode === verificationCode) {
//         user.verified = true;
//
//         await user.save();
//
//         return res.send('User successfully verified');
//     }
//
//     return res.send('Could not verify user');
// }

// export async function forgotPasswordHandler(
//     req: Request<{}, {}, ForgotPasswordInput>,
//     res: Response
// ) {
//     const message =
//         'If a user with that email is registered you will receive a password reset email';
//
//     const { email } = req.body;
//
//     const user = await findUserByEmail(email);
//
//     if (!user) {
//         log.debug(`User with email ${email} does not exists`);
//         return res.send(message);
//     }
//
//     if (!user.verified) {
//         return res.send('User is not verified');
//     }
//
//     const passwordResetCode = nanoid();
//
//     user.passwordResetCode = passwordResetCode;
//
//     await user.save();
//
//     await sendEmail({
//         to: user.email,
//         from: 'test@example.com',
//         subject: 'Reset your password',
//         text: `Password reset code: ${passwordResetCode}. Id ${user._id}`,
//     });
//
//     log.debug(`Password reset email sent to ${email}`);
//
//     return res.send(message);
// }

// export async function resetPasswordHandler(
//     req: Request<ResetPasswordInput['params'], {}, ResetPasswordInput['body']>,
//     res: Response
// ) {
//     const { id, passwordResetCode } = req.params;
//
//     const { password } = req.body;
//
//     const user = await findUserById(id);
//
//     if (
//         !user ||
//         !user.passwordResetCode ||
//         user.passwordResetCode !== passwordResetCode
//     ) {
//         return res.status(400).send('Could not reset user password');
//     }
//
//     user.passwordResetCode = null;
//
//     user.password = password;
//
//     await user.save();
//
//     return res.send('Successfully updated password');
// }
