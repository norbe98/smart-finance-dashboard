import type { KpiGridProps } from "../../types/types";
import KpiCard from "./KpiCard";

export default function KpiGrid({ spent, income, stock, profit }: KpiGridProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <KpiCard spent={spent} income={income} stock={stock} profit={profit} />
        </div>
    )
}