import type { NextFunction, Response } from "express";
import type { AuthRequest, JwtUser } from "../types/types.js";
import jwt from 'jsonwebtoken'

export default function authMiddleware(
    req: AuthRequest,
    res: Response,
    next: NextFunction
) {

      const authHeader = req.headers.authorization

      if(!authHeader) return res.json({ message: "cannot fin token" })

    const token = authHeader.split(" ")[1]

    if(!token) return res.json({ message: "token has expired" })

    const decode = jwt.verify(token, process.env.JWT_SECRET!) as JwtUser

    req.user = decode

    next()
}