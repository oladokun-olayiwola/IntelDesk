import { Request, RequestHandler, Response } from "express";
import badRequestError from "../errors/badRequestError";
import { User } from "../models/User";
import bcrypt from "bcryptjs"

export const register: RequestHandler = async (req, res) => {
    const { email, username, password, role } = req.body;
    
    if(!email || !username || !password) throw new badRequestError("Username and Password are required for registration.")
    

    const userExists = await User.find({username})
    if(userExists) throw new badRequestError("Email already in use.")
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({email, username, hashedPassword, role});
    res.status(200).json({
        message: "User created Successfully.",
        error: false,
    })

    
};

export const login = (req: Request, res: Response) => {
    const { email, username, password, role} = req.body;
    
}