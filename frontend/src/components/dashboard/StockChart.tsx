import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from "recharts";
import type { StockChartProps } from "../../types/types";

export default function StockChart({ stockData, COLORS }: StockChartProps) {

    return (
            <div className="bg-white rounded-xl p-4 shadow border">
                <h2 className="font-semibold mb-4">Stock Value Distribution</h2>
                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={stockData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}>
                                {stockData.map((_, index) => (
                                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
        </div>
    )
}