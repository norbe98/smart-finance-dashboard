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

export type AuthContext = {
    user: User | null,
    signUp: (data: AuthUser) => Promise<any>,
    signIn: (data: AuthUser) => Promise<any>,
    message: string,
    logOut: () => void,
    changeMessage: (message: string) => void,
    loading: boolean,
    changeLoading: (boolean: boolean) => void,
    handleExpiredToken: () => void
}

export type AuthUser = {
    email: string,
    password: string
}

export type User = {
    id: number,
    email: string
}

export type CreateProduct = {
    nameResult: string,
    costPrice: number,
    sellingPrice: number,
    stock: number
}

export type CreateTransaction = {
    quantity: number, 
    type: string
}

export type Transaction = {
    quantity: number, 
    type: string,
    productId: number,
    date: string
}

export type Product = {
    id: number,
    name: string,
    costPrice: number,
    sellPrice: number,
    stock: number,
    transactions: Transaction[]
}

export type InventoryContext = {
    inventory: Product[],
    handleTransaction: (productId: number, type: string, quantity: number) => Promise<void>,
    createSQLProduct: (data: CreateProduct) => Promise<any>,
    removeProduct: (productId: number) => void
}

export type ProductGripProps = {
    selected: number | null,
    changeSelected: (productId: number | null) => void,
    quantity: number,
    changeQuantity: (quantity: number) => void,
    handleBuy: (productId: number, quantity: number) => void,
    handleSell: (productId: number, quantity: number) => void

}

export type ProductCardProps = {
    product: Product,
    selected: number | null,
    changeSelected: (productId: number | null) => void,
    quantity: number,
    changeQuantity: (quantity: number) => void,
    handleBuy: (productId: number, quantity: number) => void,
    handleSell: (productId: number, quantity: number) => void
}