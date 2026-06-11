import { prisma } from "../prisma.js"

const daysAgo = (days: number) => {
  const date = new Date()
  date.setDate(date.getDate() - days)
  return date
}

async function createDemoProduct(userId: number, data: {
  name: string
  costPrice: number
  sellPrice: number
  stock: number
  transactions: {
    type: "bought" | "sold"
    quantity: number
    daysAgo: number
  }[]
}) {
  const product = await prisma.product.create({
    data: {
      name: data.name,
      costPrice: data.costPrice,
      sellPrice: data.sellPrice,
      stock: data.stock,
      userId
    }
  })

  await prisma.transaction.createMany({
    data: data.transactions.map(transaction => ({
      productId: product.id,
      type: transaction.type,
      quantity: transaction.quantity,
      date: daysAgo(transaction.daysAgo)
    }))
  })

  return product
}

export async function createDemoData(userId: number) {
    await createDemoProduct(userId, {
      name: "Iphone",
      costPrice: 4500,
      sellPrice: 5500,
      stock: 38,
      transactions: [
        { type: "bought", quantity: 25, daysAgo: 8 },
        { type: "sold", quantity: 11, daysAgo: 6 },
        { type: "sold", quantity: 8, daysAgo: 3 }
      ]
    })

  await createDemoProduct(userId, {
    name: "iPhone Case",
    costPrice: 2500,
    sellPrice: 4990,
    stock: 10,
    transactions: [
      { type: "bought", quantity: 15, daysAgo: 7 },
      { type: "sold", quantity: 3, daysAgo: 2 },
      { type: "sold", quantity: 2, daysAgo: 5 }
    ]
  })

  await createDemoProduct(userId, {
    name: "USB-C Cable",
    costPrice: 1200,
    sellPrice: 2990,
    stock: 20,
    transactions: [
      { type: "bought", quantity: 25, daysAgo: 6 },
      { type: "sold", quantity: 4, daysAgo: 3 },
      { type: "sold", quantity: 1, daysAgo: 1 }
    ]
  })
}