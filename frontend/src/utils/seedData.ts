import { formatDate } from "date-fns";
import type { Product, Transaction } from "../types/types";


export const seedProducts: Product[] = [
    { id: "1", name: "Laptop", costPrice: 200000, sellPrice: 300000, stock: 10 },
    { id: "2", name: "Mouse", costPrice: 5000, sellPrice: 12000, stock: 50 }
];

export function generateSeedTransactions(count: number = 10): Transaction[] {
    const transactions: Transaction[] = [];
    const today = new Date();


    for (let i = 0; i < count; i++) {
        const date = new Date();
        date.setDate(today.getDate() - i);

        transactions.push({
            id: `t-${i}`,
            productId: i % 2 === 0 ? "1" : "2",
            type: Math.random() > 0.5 ? "sold" : "bought",
            quantity: Math.floor(Math.random() * 5) + 1,
            date: formatDate(date, "yyyy.MM.dd")
        });
    }
    return transactions.reverse();
};