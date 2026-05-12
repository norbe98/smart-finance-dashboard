import { useInventory } from "../context/InventoryContext"

export default function ManageSales() {

    const { inventory, addToStock, removeFromStock } = useInventory()

    function handleBuy(product: string) {
        addToStock(product)
    }

    function handleSell(product: string) {
        removeFromStock(product)
    }



    return (

        <div className="grid grid-cols-2 md:grid-cols-3">
                {inventory.map(product =>
                <div className="flex flex-col items-center bg-red-300">
                    <div className="flex flex-col items-start bg-white gap-3 p-5">
                    <p>Name: {product.name}</p>
                    <p>Category: {product.category}</p>
                    <p>Cost Price: {product.costPrice}</p>
                    <p>Selling Price: {product.sellingPrice}</p>
                    <p>Stock: {product.stock}</p>
                    </div>
                    <button onClick={() => handleBuy(product.name)}>Buy</button>
                    <button onClick={() => handleSell(product.name)}>Sell</button>
                </div>
                )}
        </div>

    )
}