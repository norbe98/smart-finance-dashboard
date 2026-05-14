import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { IncomeChartProps } from "../../types/types";

export default function IncomeChart({ chartData }: IncomeChartProps) {

    return (
            <div className="bg-white rounded-xl p-4 shadow border md:col-span-2">
                <h2 className="font-semibold mb-4">Income vs Spent</h2>
                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Area 
                                type="monotone" 
                                dataKey="income" 
                                stroke="#10b981" 
                                fill="#10b981" 
                                fillOpacity={0.3}/>
                            <Area 
                                type="monotone" 
                                dataKey="spent" 
                                stroke="#ef4444" 
                                fill="#ef4444" 
                                fillOpacity={0.3}/>
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
    )
}