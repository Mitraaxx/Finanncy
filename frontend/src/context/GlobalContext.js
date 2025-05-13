import React, {useContext, useState} from "react";
import axios from 'axios'

const BASE_URL = "https://finanncy-1.onrender.com";

const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) =>{

    const [incomes, setIncomes] = useState([])
    const [expense, setExpenses] = useState([])
    const [error, setError] = useState(null)

    const getToken = () => {
        return localStorage.getItem('token');
    };

    // incomes
    const addIncome = async(income) =>{
        const token = getToken();
        if (!token) {
            return setError("User not authenticated");
        }
        try {
            console.log("Adding income with data:", income);
            console.log("Using token:", token);
            const response = await axios.post(`${BASE_URL}add-income`, income, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log("Add income response:", response.data);
            getIncomes();
        } catch (err) {
            console.error("Add income error:", err);
            if (err.response) {
                console.error("Server error response:", err.response.data);
                setError(err.response.data.message || "Server error occurred");
            } else if (err.request) {
                console.error("No response received:", err.request);
                setError("No response from server");
            } else {
                console.error("Request error:", err.message);
                setError("Error setting up request: " + err.message);
            }
        }
    }

    const getIncomes = async () =>{
        const token = getToken();
        if (!token) {
            return setError("User not authenticated");
        }
        try {
            console.log("Fetching incomes with token:", token);
            const response = await axios.get(`${BASE_URL}get-income`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log("Get incomes response:", response.data);
            setIncomes(response.data);
        } catch (err) {
            console.error("Get incomes error:", err);
            if (err.response) {
                console.error("Server error response:", err.response.data);
                setError(err.response.data.message || "Server error occurred");
            } else if (err.request) {
                console.error("No response received:", err.request);
                setError("No response from server");
            } else {
                console.error("Request error:", err.message);
                setError("Error setting up request: " + err.message);
            }
        }
    }

    const deleteIncome = async(id) =>{
        const token = getToken();
        if (!token) {
            return setError("User not authenticated");
        }
        try {
            console.log("Deleting income with ID:", id);
            console.log("Using token:", token);
            const response = await axios.delete(`${BASE_URL}delete-income/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log("Delete income response:", response.data);
            getIncomes();
        } catch (err) {
            console.error("Delete income error:", err);
            if (err.response) {
                console.error("Server error response:", err.response.data);
                setError(err.response.data.message || "Server error occurred");
            } else if (err.request) {
                console.error("No response received:", err.request);
                setError("No response from server");
            } else {
                console.error("Request error:", err.message);
                setError("Error setting up request: " + err.message);
            }
        }
    }

    const totalIncome = ()=>{
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })
        return totalIncome;
    }

    // expenses
    const addExpense = async(expense) =>{
        const token = getToken();
        if (!token) {
            return setError("User not authenticated");
        }
        try {
            console.log("Adding expense with data:", expense);
            console.log("Using token:", token);
            const response = await axios.post(`${BASE_URL}add-expense`, expense, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log("Add expense response:", response.data);
            getExpenses();
        } catch (err) {
            console.error("Add expense error:", err);
            if (err.response) {
                console.error("Server error response:", err.response.data);
                setError(err.response.data.message || "Server error occurred");
            } else if (err.request) {
                console.error("No response received:", err.request);
                setError("No response from server");
            } else {
                console.error("Request error:", err.message);
                setError("Error setting up request: " + err.message);
            }
        }
    }

    const getExpenses = async () =>{
        const token = getToken();
        if (!token) {
            return setError("User not authenticated");
        }
        try {
            const response = await axios.get(`${BASE_URL}get-expense`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setExpenses(response.data);
        } catch (err) {
            setError(err.response.data.message);
        }
    }

    const deleteExpense = async(id) =>{
        const token = getToken();
        if (!token) {
            return setError("User not authenticated");
        }
        try {
            await axios.delete(`${BASE_URL}delete-expense/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            getExpenses()
        } catch (err) {
            setError(err.response.data.message);
        }
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
