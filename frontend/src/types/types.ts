export type Product = {
    id: string,
    name: string,
    costPrice: number,
    sellPrice: number,
    stock: number
}

export type CreateInventoryProps = {
    inventory: Product[],
    addProduct: (product: Product) => void,
    removeProduct: (id: string) => void,
    addToStock: (selected: string, quantity: number) => void,
    removeFromStock: (selected: string, quantity: number) => void,
}

export type Transaction = {
    id: string,
    productId: string,
    type: "sold" | "bought",
    quantity: number,
    date: string
}

export type CreateTransactionsProps = {
    transactions: Transaction[],
    addTransaction: (transaction: Transaction) => void,
    date: string
}

export type ProductGridProps = {
    selected: string | null,
    changeSelected: (selected: string | null) => void,
    quantity: number,
    changeQuantity:(number: number) => void,
    handleBuy: (id: string, quantity: number) => void,
    handleSell: (id: string, quantity: number) => void,
}

export type ProductCardProps = {
    product: Product,
    selected: string | null,
    changeSelected: (selected: string | null) => void,
    quantity: number,
    changeQuantity: (number: number) => void,
    handleBuy: (id: string, quantity: number) => void,
    handleSell: (id: string, quantity: number) => void
}

export type KpiGridProps = {
    spent: number,
    income: number,
    stock: number,
    profit: number
}

export type KpiCardProps = {
    spent: number,
    income: number,
    stock: number,
    profit: number
}

type CharData = {
    date: string,
    income: number, 
    spent: number
}

export type IncomeChartProps = {
    chartData: CharData[]
}

type TopProducts = {
    name: string,
    profit: number
}

export type TopProductsChartProps = {
    topProducts: TopProducts[]
}

type StockData = {
    name: string, 
    value: number
}

export type StockChartProps = {
    stockData: StockData[],
    COLORS: string[],
}