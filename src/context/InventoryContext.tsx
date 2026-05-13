import { createContext, useContext, useEffect, useState } from "react";
import type { Transaction, CreateInventoryProps, Product } from "../types/types";
import { formatDate } from "date-fns";

const inventoryContext = createContext<CreateInventoryProps | null>(null)

export default function InventoryProvider( {children}: {children: React.ReactNode}) {

    const [inventory, setInventory] = useState<Product[]>(() => {
        const stored = localStorage.getItem('inventory')
        return stored ? JSON.parse(stored) : []
    })

    useEffect(() => {
        localStorage.setItem('inventory', JSON.stringify(inventory))
    }, [inventory])

    const [transactions, setTransactions] = useState<Transaction[]>(() => {
        const stored = localStorage.getItem('transactions')
        return stored ? JSON.parse(stored) : []
    })

    useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
    }, [transactions])

    const rawDate = new Date()
    const date = formatDate(rawDate, "yyyy.MM.dd.")
    

    function addProduct(product: Product) {
        setInventory(prev => [...prev, product])
    }

    function addTransaction(transaction: Transaction) {
        setTransactions(prev => [...prev, transaction])
    }

    function addToStock(selected: string, quantity: number) {
        setInventory(prev => prev.map(product => product.id === selected ? 
            {...product, stock: product.stock + quantity} : product 
        ))
    }
    function removeFromStock(selected: string, quantity: number) {
        setInventory(prev => prev.map(product => product.id === selected ? 
            {...product, stock: product.stock - quantity} : product 
        ))
    }

    return (
        <inventoryContext.Provider value={{ inventory, addProduct, addTransaction, addToStock, removeFromStock, date }}>
        {children}
        </inventoryContext.Provider>
    )
}

export function useInventory() {
    const ctx = useContext(inventoryContext)
    if (!ctx) throw new Error("Something went wrong")
    return ctx
}