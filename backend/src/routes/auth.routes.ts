import express, { type Request, type Response } from 'express'
import { prisma } from '../prisma.js'
import bcrypt from 'bcrypt'
import  jwt  from 'jsonwebtoken'
import authMiddleware from '../middleware/auth.middleware.js'
import type { AuthRequest } from '../types/types.js'
import { createDemoData } from '../utils/helper.js'
export const authRouter = express.Router()

authRouter.get("/me", authMiddleware, async (req: AuthRequest, res: Response) => {
    res.json(req.user)
})


authRouter.post("/signup", async (req: Request, res: Response) => {
    const { email, password } = req.body

    const existingUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if(existingUser) return res.status(400).json({ message: "Email already exists!"})

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
        data: {
            email: email,
            password: hashedPassword
        }
    })

    await createDemoData(newUser.id)

    res.status(201).json(newUser.email)
})

authRouter.post("/signin", async (req: Request, res: Response) => {
    const { email, password } = req.body

    const existingUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if(!existingUser) return res.status(401).json({ message: "Email doesnt exists!"})

    const isPasswordValid = await bcrypt.compare(password, existingUser.password)

    if(!isPasswordValid) return res.status(401).json({ message: "Password is not correct!"})

    const token = jwt.sign({
            id: existingUser.id,
            email: existingUser.email
        },
        process.env.JWT_SECRET!,
        {
            expiresIn: "1m"
        }
    )

    res.status(200).json({
        token,
        userData: {
            id: existingUser.id,
            email: existingUser.email
        }
    })

})
