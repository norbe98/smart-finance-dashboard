import { createContext, useContext, useState } from "react";
import type { CreateInventoryProps, Inventory } from "../types/types";

const inventoryContext = createContext<CreateInventoryProps | null>(null)

export default function InventoryProvider( {children}: {children: React.ReactNode}) {

    const [inventory, setInventory] = useState<Inventory[]>([])

    function addProduct(product: Inventory) {
        setInventory(prev => [...prev, product])
    }

    function addToStock(selected: string) {
        setInventory(prev => prev.map(product => product.name === selected ? 
            {...product, stock: product.stock + 1} : product 
        ))
    }
    function removeFromStock(selected: string) {
        setInventory(prev => prev.map(product => product.name === selected ? 
            {...product, stock: product.stock - 1} : product 
        ))
    }

    return (
        <inventoryContext.Provider value={{ inventory, addProduct, addToStock, removeFromStock }}>
        {children}
        </inventoryContext.Provider>
    )
}

export function useInventory() {
    const ctx = useContext(inventoryContext)
    if (!ctx) throw new Error("Something went wrong")
    return ctx
}