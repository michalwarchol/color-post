import {Request, Response, NextFunction} from "express";
import { verify } from "jsonwebtoken";


export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;
    if (token) {
        try {
            verify(token, process.env.JWT_SECRET as string);
            next();
        } catch (err) {
            res.redirect(301, "/login");
        }
    }
    else {
        res.redirect(301, "/login");
    }
}