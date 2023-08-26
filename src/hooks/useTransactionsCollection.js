import { useState } from "react"
import {v4 as uuidv4} from 'uuid'

export default function useTransactionsCollection() {
    const [transactions, setTransactions] = useState(() => {
        const storedTransactions = localStorage.getItem('transactions')
        if (!storedTransactions) return []
        return JSON.parse(storedTransactions)
    })

    const addTransaction = ({ transactionName, transactionType, amount, category }) => {
        const id = uuidv4()
        const transaction = { id, transactionName, transactionType, amount, category }
        setTransactions(state => {
            const newState = [...state, transaction]
            localStorage.setItem('transactions', JSON.stringify(newState))
            return newState
        })
    }

    const removeTransaction = (id) => {
        setTransactions(state => {
            const newState = state.filter((transaction) => transaction.id !== id);
            localStorage.setItem('transactions', JSON.stringify(newState))
            return newState
        })
    }

    return {transactions, addTransaction, removeTransaction}
}