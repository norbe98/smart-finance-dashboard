import { useInventory } from "../../context/InventoryContext";
import type { ProductCardProps } from "../../types/types";

export default function ProductCard({ product, selected, changeSelected, quantity, changeQuantity, handleBuy, handleSell }: ProductCardProps) {

    const { removeProduct } = useInventory()

    return (
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

                    {selected === product.id ? 

                    <div className="flex flex-col gap-2 w-full">
                        <div className="flex gap-2 w-full">
                            <input className="w-full text-center" value={quantity} onChange={(e) => changeQuantity(Number(e.target.value))}/>
                            <button onClick={() => handleBuy(product.id, quantity)}>Buy</button>
                            <button onClick={() => handleSell(product.id, quantity)}>Sell</button>
                        </div>

                        <button onClick={() => changeSelected(null)}>Cancel</button>
                    </div>

                    : <button onClick={() => changeSelected(product.id)}>Make transaction</button>}

                    <button onClick={() => removeProduct(product.id)}>Remove</button>
                </div>
    )
}