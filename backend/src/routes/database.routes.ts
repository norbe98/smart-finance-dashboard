import express, { type Response } from 'express'
import { prisma } from '../prisma.js'
import authMiddleware from '../middleware/auth.middleware.js'
import type { AuthRequest } from '../types/types.js'

export const dataBaseRouter = express.Router()

dataBaseRouter.get("/inventory", authMiddleware ,async (req: AuthRequest, res: Response) => {

    const inventory = await prisma.product.findMany({
      where: {
        userId: Number(req.user?.id)
      },
      include: {
        transactions: true
      }
    })

    res.json(inventory)
})

dataBaseRouter.post("/product", authMiddleware, async (req: AuthRequest, res: Response) => {

    const { name, costPrice, sellingPrice, stock } = req.body

    const existingUser = await prisma.user.findUnique({
        where: { 
          id: Number(req.user?.id)
        }
    })

    if(!existingUser) return res.status(404).json({ message: "Not authorized" })

    const existingProduct = await prisma.product.findFirst({
        where: {
            userId: existingUser.id,
            name: name
        }
    })

    if(existingProduct) return res.status(400).json({ message: "Product already exists" })

    const product = await prisma.product.create({
        data: {
            name: name,
            costPrice: costPrice,
            sellPrice: sellingPrice,
            stock: stock,
            userId: existingUser.id
        }
    })

    const transaction = await prisma.transaction.create({
        data: {
            productId: product.id,
            type: "bought",
            quantity: product.stock,
        }
    })

    res.status(200).json({
            id: product.id,
            name: product.name,
            costPrice: product.costPrice,
            sellPrice: product.sellPrice,
            stock: product.stock,
            transactions: [{
                id: transaction.id,
                type: "bought",
                quantity: transaction.quantity,
                productId: product.id,
                date: new Date(transaction.date).toLocaleString("hu-HU")
            }]
    })
})

dataBaseRouter.delete("/product/:id", authMiddleware, async (req: AuthRequest, res: Response) => {

    const userId = Number(req.user?.id)
    const productId = Number(req.params.id)

    const existingUser = await prisma.user.findUnique({
        where: { 
          id: userId
        }
    })

    if(!existingUser) return res.status(404).json({ message: "Not authorized" })

    await prisma.transaction.deleteMany({
      where: {
        productId: productId
      }
    }) 
      
    await prisma.product.delete({
        where: {
            userId: existingUser.id,
            id: productId
        }
    })
    res.sendStatus(200)
  })

dataBaseRouter.post("/transaction/product/:id", authMiddleware, async (req: AuthRequest, res: Response) => {
  const productId = Number(req.params.id)
  const { quantity, type } = req.body
  const userId = Number(req.user?.id)

  const existingProduct = await prisma.product.findFirst({
    where: {
      id: productId,
      userId: userId
    }
  })

  if (!existingProduct) {
    return res.status(404).json({ message: "Product not found" })
  }

  const stockChange =
    type === "bought"
      ? { increment: quantity }
      : { decrement: quantity }

  const product = await prisma.product.update({
    where: {
      id: productId
    },
    data: {
      stock: stockChange
    },
    include: {
      transactions: true
    }
  })

  await prisma.transaction.create({
    data: {
      productId: product.id,
      type,
      quantity
    }
  })

  const updatedProduct = await prisma.product.findUnique({
    where: {
      id: product.id
    },
    include: {
      transactions: true
    }
  })

  res.json(updatedProduct)
})