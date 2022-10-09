import { NextFunction, Request, Response } from 'express';

const requireUser = (req: Request, res: Response, next: NextFunction) => {
    // it always exists after every request on res.locals, very cool
    const user = res.locals.user;
    console.log(res);
    console.log(res.locals);
    console.log('require user/');
    if (!user) {
        console.log('i sent the 403');
        return res.sendStatus(403);
    }
    console.log('requireuser user: ', user);
    return next();
};

export default requireUser;
