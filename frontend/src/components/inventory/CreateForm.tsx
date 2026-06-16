import { useState } from "react"
import { PlusCircle, Tag, DollarSign, Package, ShoppingCart } from "lucide-react"
import { useInventory } from "../../context/InventoryContext"
import { useAuth } from "../../context/AuthContext"

export default function CreateForm() {
    const [name, setName] = useState<string>("")
    const [costPrice, setCostPrice] = useState<number>(0)
    const [sellingPrice, setSellingPrice] = useState<number>(0)
    const [stock, setStock] = useState<number>(0)
    const { changeMessage, message, loading, changeLoading } = useAuth()

    const nameResult = name.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
    
    const { createSQLProduct } = useInventory()

    function resetForm() {
        setName("")
        setCostPrice(0)
        setSellingPrice(0)
        setStock(0)
    }
    
    async function handleSubmit () {
        changeLoading(true)
        try {
            const data = await createSQLProduct({nameResult, costPrice, sellingPrice, stock})
            changeMessage(data.message)
            resetForm()
        } catch (error) {
            if(error instanceof Error) {
                changeMessage(error.message)
            }
        } finally {
            changeLoading(false)
        }
    }


    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
            <form className="space-y-4" 
                onSubmit={(e) => {
                    e.preventDefault() 
                    handleSubmit()
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
                    type="submit" disabled={loading}>
                    <PlusCircle size={20} />
                    {loading ? (
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Adding product...</span>
                        </div>
                        ) : (
                        "Add Product"
                    )}
                </button>
                    {message === "You created a product successfully!" ? 
                        <p className="mt-4 text-sm text-green-600">
                            {message}
                        </p>
                        :
                        <p className="mt-4 text-sm text-red-600">
                            {message}
                        </p>
                    }
            </form>
        </div>
    )
}