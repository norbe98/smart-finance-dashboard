import { useState } from "react"
import { useInventory } from "../context/InventoryContext"
import { toast } from "sonner"

export default function CreateInventory() {

    const [name, setName] = useState<string>("")
    const [category, setCategory] = useState<string>("")
    const [costPrice, setCostPrice] = useState<number>(0)
    const [sellingPrice, setSellingPrice] = useState<number>(0)
    const [stock, setStock] = useState<number>(0)

    const { addProduct } = useInventory()

    function submitForm() {
        addProduct({
            name: name,
            category: category,
            costPrice: costPrice,
            sellingPrice: sellingPrice,
            stock: stock
            })
    }

    return (

        <div className="flex flex-col items-center w-full">
            <form className="flex flex-col justify-center items-start gap-3 w-100" onSubmit={(e) => {
                e.preventDefault() 
                submitForm()
                }}>

                <div className="flex w-full gap-2">
                    <label>Name:</label>
                    <input className="bg-white w-full" onChange={(e) => setName(e.target.value)} value={name}/>
                </div>

                <div className="flex w-full gap-2">
                    <label>Category:</label>
                    <input className="bg-white w-full" onChange={(e) => setCategory(e.target.value)} value={category}/>
                </div>

                <div className="flex w-full gap-2">
                    <label>Cost Price:</label>
                    <input className="bg-white w-full" onChange={(e) => setCostPrice(Number(e.target.value))} value={costPrice}/>
                </div>

                <div>
                    <label>Selling Price:</label>
                    <input className="bg-white" onChange={(e) => setSellingPrice(Number(e.target.value))} value={sellingPrice}/>
                </div>

                <div>
                    <label>Stock:</label>
                    <input className="bg-white" onChange={(e) => setStock(Number(e.target.value))} value={stock}/>
                </div>

                <button onClick={() => toast.success("Item successfully added!")}>Submit</button>
            </form>

        </div>

    )
}