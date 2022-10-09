import { NextFunction, Request, Response } from 'express';

const requireUser = (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user; // it always exists after every request on res.locals, very cool
    if (!user) {
        return res.send(403);
    }

    return next();
};

export default requireUser;
