import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { TopProductsChartProps } from "../../types/types";

export default function TopProductsChart({ topProducts }: TopProductsChartProps) {

    return (
        <div className="bg-white rounded-xl p-4 shadow border">
            <h2 className="font-semibold mb-4">Top 5 Products by Profit</h2>
            <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={topProducts} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="name" width={80} />
                        <Tooltip />
                        <Bar 
                            dataKey="profit" 
                            fill="#3b82f6" 
                            radius={[0, 8, 8, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}