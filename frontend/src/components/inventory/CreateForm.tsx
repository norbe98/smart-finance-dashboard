import { useState } from "react"
import { useInventory } from "../../context/InventoryContext"
import { toast } from "sonner"
import { capitalize, isOnlyLetters } from "../../utils/utils"
import { useTransactions } from "../../context/TranscationsContext"
import { PlusCircle, Tag, DollarSign, Package, ShoppingCart } from "lucide-react"

export default function CreateInventory() {
    const [name, setName] = useState<string>("")
    const [costPrice, setCostPrice] = useState<number>(0)
    const [sellingPrice, setSellingPrice] = useState<number>(0)
    const [stock, setStock] = useState<number>(0)

    const { inventory, addProduct } = useInventory()
    const { addTransaction, date } = useTransactions()

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
        const exist = inventory.some(pr => pr.name.toLowerCase() === name.toLowerCase())
        if (exist) {
            toast.error("asdasd")
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

        toast.success(`${capitalize(name)} added successfully!`)
        resetProduct()
    }

    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
            <form className="space-y-4" 
                onSubmit={(e) => {
                    e.preventDefault() 
                    submitForm()
                }}>
                    
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <Tag size={16} className="text-indigo-500" />
                        Product Name
                    </label>
                    <input className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none" 
                        placeholder="e.g. Vintage Watch"
                        onChange={(e) => setName(e.target.value)} 
                        value={name}/>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                            <DollarSign size={16} className="text-emerald-500" />
                            Cost Price
                        </label>
                        <input className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none" 
                            type="number"
                            onChange={(e) => setCostPrice(Number(e.target.value))} 
                            value={costPrice || ''}/>
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                            <ShoppingCart size={16} className="text-blue-500" />
                            Sell Price
                        </label>
                        <input className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none" 
                            type="number"
                            onChange={(e) => setSellingPrice(Number(e.target.value))} 
                            value={sellingPrice || ''}/>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <Package size={16} className="text-amber-500" />
                        Initial Stock
                    </label>
                    <input className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none" 
                        type="number"
                        onChange={(e) => setStock(Number(e.target.value))} 
                        value={stock || ''}/>
                </div>

                <button className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-indigo-700 active:scale-[0.98] transition-all mt-4 shadow-lg shadow-indigo-200" 
                    type="submit">
                    <PlusCircle size={20} />
                    Add Product
                </button>
            </form>
        </div>
    )
}