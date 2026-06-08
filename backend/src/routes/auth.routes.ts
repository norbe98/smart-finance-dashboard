import express, { type Request, type Response } from 'express'
import { prisma } from '../prisma.js'
import bcrypt from 'bcrypt'

export const authRouter = express.Router()


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

    res.status(201).json(newUser.email)
})
