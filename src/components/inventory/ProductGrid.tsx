import { useInventory } from "../../context/InventoryContext"
import type { ProductGridProps } from "../../types/types"
import ProductCard from "./ProductCard"

export default function ProductGrid({ selected, changeSelected, quantity, changeQuantity, handleBuy, handleSell }: ProductGridProps) {

    const { inventory } = useInventory()

    return (

        <div className="grid grid-cols-2 md:grid-cols-3 w-full h-full p-4 bg-slate-500/50 rounded-2xl gap-3">
                {inventory.map(product =>
                    <ProductCard product={product} selected={selected} changeSelected={changeSelected} quantity={quantity} changeQuantity={changeQuantity} handleBuy={handleBuy} handleSell={handleSell}/>
                )}
        </div>
    )
}