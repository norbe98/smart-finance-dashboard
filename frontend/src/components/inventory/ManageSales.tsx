import { useState } from "react"
import { toast } from "sonner"
import ProductGrid from "./ProductGrid"
import { useAuth } from "../../context/AuthContext"
import { useInventory } from "../../context/InventoryContext"

export default function ManageSales() {

    const [selected, setSelected] = useState<number | null>(null)
    const [quantity, setQuantity] = useState<number>(0)
    const { handleTransaction } = useInventory()

    function changeSelected (productId: number | null) {
        setSelected(productId)
    }

    function changeQuantity (quantity: number) {
        setQuantity(quantity)
    }

    function handleBuy(productId: number, quantity: number) {
        handleTransaction(productId, "bought", quantity)
        setSelected(null)
    }

    function handleSell(productId: number, quantity: number) {
        handleTransaction(productId, "sold", quantity)
        setSelected(null)
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