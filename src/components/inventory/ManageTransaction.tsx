import { useState } from "react"
import { useInventory } from "../../context/InventoryContext"
import { toast } from "sonner"
import { useTransactions } from "../../context/TranscationsContext"
import ProductGrid from "./ProductGrid"

export default function ManageSales() {

    const { inventory, addToStock, removeFromStock } = useInventory()
    const { addTransaction, date } = useTransactions()

    const [selected, setSelected] = useState<string | null>(null)
    const [quantity, setQuantity] = useState<number>(0)

    function changeSelected(selected: string | null) {
        setSelected(selected)
    }

    function changeQuantity(number: number) {
        setQuantity(number)
    }

    function handleBuy(id: string, quantity: number) {
        if (quantity <= 0) {
            toast.error("Quantity must be greater than 0!")
            return
        }

        addToStock(id, quantity)
        
        addTransaction({
            id: crypto.randomUUID(),
            productId: id,
            type: "bought",
            quantity: quantity,
            date: date
        })
        
        toast.success(`Restocked ${quantity} units successfully!`)
        setSelected(null)
        setQuantity(0)
    }

    function handleSell(id: string, quantity: number) {
        if (quantity <= 0) {
            toast.error("Quantity must be greater than 0!")
            return
        }

        const product = inventory.find(p => p.id === id)
        if (product && product.stock < quantity) {
            toast.error(`Not enough stock! (Current: ${product.stock})`)
            return
        }
        
        removeFromStock(id, quantity)
        
        addTransaction({
            id: crypto.randomUUID(),
            productId: id,
            type: "sold",
            quantity: quantity,
            date: date
        })
        
        toast.success(`Sold ${quantity} units successfully!`)
        setSelected(null)
        setQuantity(0)
    }

    return (
        <ProductGrid 
        selected={selected} 
        changeSelected={changeSelected} 
        quantity={quantity}  
        changeQuantity={changeQuantity} 
        handleBuy={handleBuy} 
        handleSell={handleSell} />
    )
}