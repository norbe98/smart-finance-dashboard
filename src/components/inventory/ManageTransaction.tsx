import { useState } from "react"
import { useInventory } from "../../context/InventoryContext"
import { toast } from "sonner"
import { useTransactions } from "../../context/TranscationsContext"
import ProductGrid from "./ProductGrid"

export default function ManageSales() {

    const { addToStock, removeFromStock } = useInventory()

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
            toast.error("Quantity cannot be 0 or lower!")
            return
        }

        addToStock(id, quantity)

        toast.success(`Successfully bought ${quantity} more!`)

        addTransaction({
            id: crypto.randomUUID(),
            productId: id,
            type: "bought",
            quantity: quantity,
            date: date
        })


        setSelected(null)
        setQuantity(0)
    }

    function handleSell(id: string, quantity: number) {
        removeFromStock(id, quantity)

        if (quantity <= 0) {
            toast.error("Quantity cannot be 0 or lower!")
            return
        }

        toast.success(`Successfully sold ${quantity}!`)

        addTransaction({
            id: crypto.randomUUID(),
            productId: id,
            type: "sold",
            quantity: quantity,
            date: date
        })

        setSelected(null)
        setQuantity(0)
    }

    return (

        <ProductGrid selected={selected} changeSelected={changeSelected} quantity={quantity}  changeQuantity={changeQuantity} handleBuy={handleBuy} handleSell={handleSell}  />

    )
}