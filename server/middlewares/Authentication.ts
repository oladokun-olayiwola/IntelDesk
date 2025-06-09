import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import UnAuthenticatedError from "../errors/unAuthenticatedError";
import { User } from "../interfaces/User";

const verifyToken = (req: Request, res:Response, next: NextFunction) => {
    const token = req.header('Authorization');
    if(!token) throw new UnAuthenticatedError("Access Denied.")
    
    try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as User;
    req.user = decoded;
    next();
    } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
    }


}