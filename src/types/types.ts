export type CreateInventoryProps = {
    inventory: Product[],
    addProduct: (product: Product) => void,
    removeProduct: (id: string) => void,
    addToStock: (selected: string, quantity: number) => void,
    removeFromStock: (selected: string, quantity: number) => void,
}

export type CreateTransactionsProps = {
    transactions: Transaction[],
    addTransaction: (transaction: Transaction) => void,
    date: string
}

export type Product = {
    id: string,
    name: string,
    costPrice: number,
    sellPrice: number,
    stock: number
}

export type Transaction = {
    id: string,
    productId: string,
    type: "sold" | "bought",
    quantity: number,
    date: string
}



