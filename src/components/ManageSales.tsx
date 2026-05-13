import { useState } from "react"
import { useInventory } from "../context/InventoryContext"
import { toast } from "sonner"

export default function ManageSales() {

    const { inventory, addToStock, removeFromStock, addTransaction, date } = useInventory()

    const [selected, setSelected] = useState<string | null>(null)

    const [quantity, setQuantity] = useState<number>(0)
    const [clicked, setClicked] = useState<boolean>(false)

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
        setClicked(false)
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
        setClicked(false)
    }

    return (

        <div className="grid grid-cols-2 md:grid-cols-3">
                {inventory.map(product =>
                <div className="flex flex-col items-center bg-red-300">
                    <div className="flex flex-col items-start bg-white gap-3 p-5">
                    <p>Name: {product.name}</p>
                    <p>Cost Price: {product.costPrice}</p>
                    <p>Selling Price: {product.sellPrice}</p>
                    <p>Stock: {product.stock}</p>
                    </div>
                    {clicked && selected === product.id ? 

                    <div className="flex flex-col gap-2 w-full">
                        <div className="flex gap-2 w-full">
                            <input className="w-full text-center" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}/>
                            <button onClick={() => handleBuy(product.id, quantity)}>Buy</button>
                            <button onClick={() => handleSell(product.id, quantity)}>Sell</button>
                        </div>

                        <button onClick={() => setClicked(false)}>Cancel</button>
                    </div>

                    : <button onClick={() => { setSelected(product.id), setClicked(true)}}>Make transaction</button>}
                </div>
                )}
        </div>

    )
}