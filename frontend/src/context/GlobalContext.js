import React, {useContext, useState} from "react";
import axios from 'axios'

const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) =>{

    const [incomes, setIncomes] = useState([])
    const [expense, setExpenses] = useState([])
    const [error, setError] = useState(null)

    // incomes
    const addIncome = async(income) =>{
        const response = await axios.post(`${BASE_URL}add-income`, income)
        .catch((err) =>{
            setError(err.response.data.message)
        })
        getIncomes()
    }

    const getIncomes = async () =>{
        const response = await axios.get(`${BASE_URL}get-income`)
        setIncomes(response.data)
        console.log(response.data)
    }

    const deleteIncome = async(id) =>{
      const res = await axios.delete(`${BASE_URL}delete-income/${id}`)
      getIncomes()
    }

    const totalIncome = ()=>{
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })
        return totalIncome;
    }

    // incomes
    const addExpense = async(income) =>{
        const response = await axios.post(`${BASE_URL}add-expense`, income)
        .catch((err) =>{
            setError(err.response.data.message)
        })
        getExpenses()
    }

    const getExpenses = async () =>{
        const response = await axios.get(`${BASE_URL}get-expense`)
        setExpenses(response.data)
        console.log(response.data)
    }

    const deleteExpense = async(id) =>{
      const res = await axios.delete(`${BASE_URL}delete-expense/${id}`)
      getExpenses()
    }

    const totalExpense= ()=>{
        let totalIncome = 0;
        expense.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })
        return totalIncome;
    }

    const totalBalance = () =>{
        return totalIncome() - totalExpense()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expense]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 3)
    }

    const ViewHistory = () => {
        const view = [...incomes, ...expense]
        view.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return view
    }

    return(
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expense,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpense,
            totalBalance,
            transactionHistory,
            error,
            setError,
            ViewHistory
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext= () =>{
    return useContext(GlobalContext)
}