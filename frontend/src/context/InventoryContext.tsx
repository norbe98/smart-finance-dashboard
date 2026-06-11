import { createContext, useContext, useEffect, useState } from "react";
import type { CreateProduct, InventoryContext, Product } from "../types/types";
import { useAuth } from "./AuthContext";


const inventoryContext = createContext<InventoryContext | null>(null)

export default function InventoryProvider( {children}: {children: React.ReactNode}) {

    const [inventory, setInventory] = useState<Product[]>([])
    const { user } = useAuth()
    
    async function loadInventory() {
        const token = localStorage.getItem("token")
        const res = await fetch("/api/inventory", {
            method: "GET",
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        const data = await res.json()
        setInventory(data)
    }

    useEffect(() => {
        if(!user) return

        loadInventory()
    }, [user])

    async function handleTransaction(productId: number, type: string, quantity: number) {
        const token = localStorage.getItem("token")
        const res = await fetch(`/api/transaction/product/${productId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({type, quantity})
        })
        const updatedProduct = await res.json()
        console.log(updatedProduct);
        
        setInventory(prev => prev.map(product => updatedProduct.id === product.id ? updatedProduct : product))
    }

    async function createSQLProduct(data: CreateProduct) {
        const token = localStorage.getItem("token")
        const res = await fetch("/api/product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })

        if(res.status === 404) return console.log("nem vagyok belépve");
        
        const product = await res.json()
        setInventory(prev => [...prev, product])
    }

    async function removeProduct(productId: number) {
        const token = localStorage.getItem("token")
        const res = await fetch(`/api/product/${productId}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${token}`
            },
        })
        if(res.status === 200) {
            setInventory(prev => prev.filter(product => product.id !== productId))
        }
    }
    

    return (
        <inventoryContext.Provider value={{ inventory, handleTransaction, createSQLProduct, removeProduct }}>
        {children}
        </inventoryContext.Provider>
    )
}

export function useInventory() {
    const ctx = useContext(inventoryContext)
    if (!ctx) throw new Error("Something went wrong")
    return ctx
}