import { PackageSearch } from "lucide-react"
import { useInventory } from "../../context/InventoryContext"
import ProductCard from "./ProductCard"
import type { ProductGripProps } from "../../types/types"
import { useAuth } from "../../context/AuthContext"

export default function ProductGrid({ selected, changeSelected, quantity, changeQuantity, handleBuy, handleSell }: ProductGripProps) {
    const { inventory } = useInventory()
    const { loading } = useAuth()

    if (inventory.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                <PackageSearch size={48} className="text-slate-300 mb-4" />
                <p className="text-slate-500 font-medium">Your inventory is empty.</p>
                <p className="text-slate-400 text-sm">Add your first product to get started!</p>
            </div>
        )
    }

    if(loading) {
        return (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-xl border p-5 animate-pulse"
        >
          <div className="h-6 bg-slate-200 rounded w-2/3 mb-4"></div>

          <div className="space-y-3">
            <div className="h-4 bg-slate-200 rounded"></div>
            <div className="h-4 bg-slate-200 rounded"></div>
            <div className="h-4 bg-slate-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {inventory.map(product =>
                <ProductCard 
                    key={product.id} 
                    product={product}
                    selected={selected}
                    changeSelected={changeSelected}
                    quantity={quantity}
                    changeQuantity={changeQuantity}
                    handleBuy={handleBuy}
                    handleSell={handleSell}
                     />
            )}
        </div>
    )
}