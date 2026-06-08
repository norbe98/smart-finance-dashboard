import { createContext, useState, useContext, useEffect } from "react";
import type { CreateTransactionsProps, Transaction } from "../types/types";
import { generateSeedTransactions } from "../utils/seedData";
import { format } from "date-fns";

const transactionsContext = createContext<CreateTransactionsProps | null>(null)

export default function TransactionsProvider( {children}: {children: React.ReactNode}) {

    const [transactions, setTransactions] = useState<Transaction[]>(() => {
        const stored = localStorage.getItem('transactions')
        return stored ? JSON.parse(stored) : generateSeedTransactions()
    })
    
    useEffect(() => {
        localStorage.setItem('transactions', JSON.stringify(transactions))
    }, [transactions])

    const now = new Date()
    const date = format(now, "yyyy.MM.dd")

    function addTransaction(transaction: Transaction) {
        setTransactions(prev => [...prev, transaction])
    }

    return (
            <transactionsContext.Provider value={{ transactions, addTransaction, date }}>
            {children}
            </transactionsContext.Provider>
    )

}

export function useTransactions() {
    const ctx = useContext(transactionsContext)
    if (!ctx) throw new Error("Something went wrong")
    return ctx
}