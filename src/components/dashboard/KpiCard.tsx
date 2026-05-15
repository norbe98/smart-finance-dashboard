import type { KpiCardProps } from "../../types/types";

export default function KpiCard({ spent, income, stock, profit }: KpiCardProps) {

    return (
        <>
            <div className="bg-white rounded-xl p-4 shadow border">
            <p className="text-sm text-gray-500">Total Spent</p>
            <p className="text-2xl truncate font-bold text-red-500" title={spent.toFixed(2)}>${spent.toFixed(2)}</p>
            </div>

            <div className="bg-white rounded-xl p-4 shadow border">
            <p className="text-sm text-gray-500">Total Income</p>
            <p className="text-2xl truncate font-bold text-green-500" title={spent.toFixed(2)}>${income.toFixed(2)}</p>
            </div>

            <div className="bg-white rounded-xl p-4 shadow border">
            <p className="text-sm text-gray-500">Stock Value</p>
            <p className="text-2xl truncate font-bold text-blue-500" title={spent.toFixed(2)}>${stock.toFixed(2)}</p>
            </div>

            <div className="bg-white rounded-xl p-4 shadow border">
            <p className="text-sm text-gray-500">Net Profit</p>
            <p className="text-2xl truncate font-bold text-purple-500" title={spent.toFixed(2)}>${profit.toFixed(2)}</p>
            </div>
        </>
    )
}