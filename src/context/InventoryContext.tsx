import { createContext, useContext, useEffect, useState } from "react";
import type { CreateInventoryProps, Product } from "../types/types";
import { seedProducts } from "../utils/seedData";

const inventoryContext = createContext<CreateInventoryProps | null>(null)

export default function InventoryProvider( {children}: {children: React.ReactNode}) {

    const [inventory, setInventory] = useState<Product[]>(() => {
        const stored = localStorage.getItem('inventory')
        return stored ? JSON.parse(stored) : seedProducts
    })

    useEffect(() => {
        localStorage.setItem('inventory', JSON.stringify(inventory))
    }, [inventory])
    
    function addProduct(product: Product) {
        setInventory(prev => [...prev, product])
    }


    function removeProduct(id: string) {
        setInventory(prev => prev.filter(product => product.id !== id))
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
        <inventoryContext.Provider value={{ inventory, addProduct, removeProduct, addToStock, removeFromStock }}>
        {children}
        </inventoryContext.Provider>
    )
}

export function useInventory() {
    const ctx = useContext(inventoryContext)
    if (!ctx) throw new Error("Something went wrong")
    return ctx
}