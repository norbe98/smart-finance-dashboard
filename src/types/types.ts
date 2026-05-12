export type CreateInventoryProps = {
    inventory: Inventory[],
    addProduct: (product: Inventory) => void,
    addToStock: (selected: string) => void,
    removeFromStock: (selected: string) => void
}

export type Inventory = {
    name: string,
    category: string,
    costPrice: number,
    sellingPrice: number,
    stock: number
}