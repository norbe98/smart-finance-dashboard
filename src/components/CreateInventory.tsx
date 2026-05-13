import { useState } from "react"
import { useInventory } from "../context/InventoryContext"
import { toast } from "sonner"
import { capitalize, isOnlyLetters } from "../utils/utils"

export default function CreateInventory() {

    const [name, setName] = useState<string>("")
    const [costPrice, setCostPrice] = useState<number>(0)
    const [sellingPrice, setSellingPrice] = useState<number>(0)
    const [stock, setStock] = useState<number>(0)

    const { addProduct, addTransaction, date } = useInventory()

    function resetProduct() {
        setName("")
        setCostPrice(0)
        setSellingPrice(0)
        setStock(0)
    }

    function submitForm() {

        if (!name.trim()) {
            toast.error("The name cannot be empty!")
            return
        }

        if(!isOnlyLetters(name)) {
            toast.error("This name field can only contain letters!")
            return
        }
        

        if (costPrice <= 0 || sellingPrice <= 0) {
            toast.error("The prices cannot be 0 or lower!")
            return
        }

        if (stock <= 0) {
            toast.error("The stock cannot be 0 or lower!")
            return
        }

        const id = crypto.randomUUID()

        addProduct({
            id: id,
            name: capitalize(name),
            costPrice: costPrice,
            sellPrice: sellingPrice,
            stock: stock
            })

        addTransaction({
            id: crypto.randomUUID(),
            productId: id,
            type: "bought",
            quantity: stock,
            date: date
        })

        toast.success(`${name} has been successfully added to your inventory!`)
        resetProduct()

    }

    return (

        <div className="flex flex-col items-center p-5 bg-slate-500/50 w-full rounded-xl h-60">
            <form className="flex flex-col justify-center items-start gap-3 w-full" onSubmit={(e) => {
                e.preventDefault() 
                submitForm()
                }}>

                <div className="flex w-full gap-2">
                    <label className="w-28">Name:</label>
                    <input className="bg-white w-full rounded-xl text-center" onChange={(e) => setName(e.target.value)} value={name}/>
                </div>

                <div className="flex w-full gap-2">
                    <label className="w-28">Cost: ($)</label>
                    <input className="bg-white w-full rounded-xl text-center" onChange={(e) => setCostPrice(Number(e.target.value))} value={costPrice}/>
                </div>

                <div className="flex w-full gap-2">
                    <label className="w-28">Sell for: ($)</label>
                    <input className="bg-white w-full rounded-xl text-center" onChange={(e) => setSellingPrice(Number(e.target.value))} value={sellingPrice}/>
                </div>

                <div className="flex w-full gap-2">
                    <label className="w-28">Stock:</label>
                    <input className="bg-white w-full rounded-xl text-center" onChange={(e) => setStock(Number(e.target.value))} value={stock}/>
                </div>

                <div className="flex w-full justify-end">
                <button className="bg-slate-500 rounded-xl p-2 hover:bg-slate-600" type="submit">Submit</button>
                </div>

            </form>

        </div>

    )
}