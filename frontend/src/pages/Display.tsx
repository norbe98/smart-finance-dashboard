import { useTransactions } from "../context/TranscationsContext"
import { useInventory } from "../context/InventoryContext"
import KpiGrid from "../components/dashboard/KpiGrid";
import IncomeChart from "../components/dashboard/IncomeChart";
import TopProductsChart from "../components/dashboard/TopProductsChart";
import StockChart from "../components/dashboard/StockChart";

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function Display() {
    const { transactions } = useTransactions()
    const { inventory } = useInventory()

    const boughtTransactions = transactions.filter(tr => tr.type === "bought")
    const spent = boughtTransactions.reduce((acc, tr) => {
        const product = inventory.find(p => p.id === tr.productId);
        return product ? acc + (product.costPrice * tr.quantity) : acc;
    }, 0)
    
    const soldTransactions = transactions.filter(tr => tr.type === "sold")
    const income = soldTransactions.reduce((acc, tr) => {
        const product = inventory.find(p => p.id === tr.productId);
        return product ? acc + (product.sellPrice * tr.quantity) : acc;
    }, 0)

    const stock = inventory.reduce((acc, product) => {
        return acc + (product.costPrice * product.stock)
    }, 0)

    const profit = soldTransactions.reduce((acc, tr) => {
        const product = inventory.find(p => p.id === tr.productId);
        if (product) {
            return acc + ((product.sellPrice - product.costPrice) * tr.quantity);
        }
        return acc;
    }, 0)

    const chartData = transactions.reduce((acc, tr) => {
        const product = inventory.find(p => p.id === tr.productId);
        if (!product) return acc;

        console.log(acc);
        const existingDay = acc.find(d => d.date === tr.date);

        const amount = tr.type === 'bought'
            ? product.costPrice * tr.quantity
            : product.sellPrice * tr.quantity;

        if (existingDay) {
            if (tr.type === 'bought') existingDay.spent += amount;
            else existingDay.income += amount;
        } else {
            acc.push({
                date: tr.date,
                income: tr.type === 'sold' ? amount : 0,
                spent: tr.type === 'bought' ? amount : 0,
            });
        }
        return acc;
    }, [] as { date: string; income: number; spent: number }[]);

    chartData.sort((a, b) => a.date.localeCompare(b.date));
    
    const topProducts = inventory.map(product => {
            const sales = soldTransactions.filter(tr => tr.productId === product.id);
            const totalProfit = sales.reduce((sum, tr) => {
                return sum + ((product.sellPrice - product.costPrice) * tr.quantity);
            }, 0);
            return { name: product.name, profit: totalProfit };
        }).sort((a, b) => b.profit - a.profit).slice(0, 5);

    const stockData = inventory.map(product => ({
        name: product.name,
        value: product.stock * product.costPrice
    }));

    return (
        <div className="p-6 space-y-6">
            
            <KpiGrid spent={spent} income={income} stock={stock} profit={profit} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <IncomeChart chartData={chartData}/>
                
                <TopProductsChart topProducts={topProducts}/>
                
                <StockChart stockData={stockData} COLORS={COLORS}/>
            </div>

        </div>
    )
}