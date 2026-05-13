import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useTransactions } from "../context/TranscationsContext"
import { useInventory } from "../context/InventoryContext"
import { tr } from "date-fns/locale"

export default function Display() {

    const { transactions } = useTransactions()
    const { inventory } = useInventory()

    const boughtTransactions = transactions.filter(tr => tr.type === "bought")
    const spent = boughtTransactions.reduce((acc, tr) => {
        const product = inventory.find(product => product.id === tr.productId);
        if (product) {
            return acc + (product.costPrice * tr.quantity)
        }
        return acc
    }, 0)
    
    const soldTransactions = transactions.filter(tr => tr.type === "sold")
    const income = soldTransactions.reduce((acc, tr) => {
        const product = inventory.find(product => product.id === tr.productId);
        if (product) {
            return acc + (product.sellPrice * tr.quantity)
        }
        return acc
    }, 0)

    const stock = inventory.reduce((acc, product) => {
        return acc + (product.costPrice * product.stock)
    }, 0)

    const profit = soldTransactions.reduce((acc, tr) => {
        const product = inventory.find(p => p.id === tr.productId);
        if (product) {
            const margin = product.sellPrice - product.costPrice;
            return acc + (margin * tr.quantity);
        }
        return acc;
}, 0);
    

    return (
        <div className="flex gap-3">
            <p>Overall Spent: {spent}$</p>
            <p>Overall Income: {income}$</p>
            <p>Stock: {stock}$</p>
            <p>Profit: {profit}$</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 m-3">
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={transactions}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" interval={0} textAnchor="end" angle={-45} height={90}/>
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="quantity" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

        </div>
    )
}