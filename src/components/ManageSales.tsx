import { useState } from "react"
import { useInventory } from "../context/InventoryContext"
import { toast } from "sonner"
import { useTransactions } from "../context/TranscationsContext"

export default function ManageSales() {

    const { inventory, addToStock, removeFromStock, removeProduct } = useInventory()

    const { addTransaction, date } = useTransactions()

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

        <div className="grid grid-cols-2 md:grid-cols-3 w-full h-full p-4 bg-slate-500/50 rounded-2xl gap-3">
                {inventory.map(product =>
                <div className="flex flex-col items-center justify-center p-2 m-auto bg-red-200 gap-2 rounded-2xl">

                    <div className="flex flex-col items-start bg-white gap-3 p-5">
                        <div className="flex justify-center w-full">
                        <span>{product.name}</span>
                        </div>

                        <div className="flex justify-between w-full">
                        <p>Cost:</p>
                        <span>{product.costPrice}$</span>
                        </div>

                        <div className="flex justify-between w-full">
                        <p>Sell for:</p>
                        <span>{product.sellPrice}$</span>
                        </div>

                        <div className="flex justify-between w-full">
                        <p>Stock:</p>
                        <span>{product.stock}</span>
                        </div>
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

                    : <button onClick={() => { 
                        setSelected(product.id); 
                        setClicked(true);
                        }}>Make transaction</button>}
                        <button onClick={() => removeProduct(product.id)}>Remove</button>
                </div>
                )}
        </div>

    )
}