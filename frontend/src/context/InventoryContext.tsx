import { createContext, useContext, useEffect, useState } from "react";
import type { CreateProduct, InventoryContext, Product } from "../types/types";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";


const inventoryContext = createContext<InventoryContext | null>(null)

export default function InventoryProvider( {children}: {children: React.ReactNode}) {

    const [inventory, setInventory] = useState<Product[]>([])
    const { user, logOut, changeLoading } = useAuth()
    
    useEffect(() => {
        if(!user) return

        loadInventory()
    }, [user])

    async function loadInventory() {
        changeLoading(true)
        try {
            const token = localStorage.getItem("token")
            if(!token) return
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/inventory`, {
                method: "GET",
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
    
            if (res.status === 401) {
                localStorage.removeItem("token")
                logOut()
                return
            }
    
            const data = await res.json()
            setInventory(data)
            changeLoading(false)
            
        } catch (error) {
            
        } finally {
            changeLoading(false)
        }
        
    }


    async function handleTransaction(productId: number, type: string, quantity: number) {
        const token = localStorage.getItem("token")

        if(!token) return

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/transaction/product/${productId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({type, quantity})
        })
        const data = await res.json()

        if(!res.ok) throw new Error(data.message);
        
        if(res.status === 200) {
            setInventory(prev => prev.map(product => data.product.id === product.id ? data.product : product))
            toast.success(data.message)
        }
        return data
    }

    async function createSQLProduct(data: CreateProduct) {
        const token = localStorage.getItem("token")

        if(!token) return

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/product`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        
        const content = await res.json()

        if(!res.ok) throw new Error(content.message);
        
        if(res.status === 201) {
            setInventory(prev => [...prev, content.product])
        }

        return content
    }

    async function removeProduct(productId: number) {
        const token = localStorage.getItem("token")

        if(!token) return

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/product/${productId}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${token}`
            },
        })

        const data = await res.json()

        if(res.status === 200) {
            setInventory(prev => prev.filter(product => product.id !== productId))
            toast.success(data.message)
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