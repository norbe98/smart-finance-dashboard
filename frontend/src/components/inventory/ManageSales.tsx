import { useState } from "react"
import ProductGrid from "./ProductGrid"
import { useInventory } from "../../context/InventoryContext"
import { toast } from "sonner"

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

    async function handleBuy(productId: number, quantity: number) {
        try {
            await handleTransaction(productId, "bought", quantity)
            setSelected(null)
        } catch (error) {
            if(error instanceof Error) {
                toast.error(error.message)
            }
        }
    }

    async function handleSell(productId: number, quantity: number) {
        try {
            await handleTransaction(productId, "sold", quantity)
            setSelected(null)
        } catch (error) {
            if(error instanceof Error) {
                toast.error(error.message)
            }
        }
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