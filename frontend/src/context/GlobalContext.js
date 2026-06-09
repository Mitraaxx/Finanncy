import React, {useContext, useState, useCallback} from "react";
import axios from 'axios'
import API_BASE_URL from '../utils/apiBase'

const BASE_URL = API_BASE_URL;

const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) =>{

    const [incomes, setIncomes] = useState([])
    const [expense, setExpenses] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [loadingStates, setLoadingStates] = useState({
        addIncome: false,
        getIncomes: false,
        deleteIncome: false,
        addExpense: false,
        getExpenses: false,
        deleteExpense: false,
        downloadExcel: false
    })

    const getToken = () => {
        return localStorage.getItem('token');
    };

    const setLoadingState = useCallback((action, isLoading) => {
        setLoadingStates(prev => ({
            ...prev,
            [action]: isLoading
        }));
        
        // Update global loading state
        setLoading(isLoading);
    }, []);

    const downloadExcel = async () => {
        const token = getToken();
        if (!token) {
            return setError("User not authenticated");
        }
        
        
        setError(null);
        
        try {
            const response = await axios.get(`${BASE_URL}/download-excel`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                responseType: 'blob' // Important for file download
            });
            
            // Create blob and download
            const blob = new Blob([response.data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            });
            
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `finnancy-data-${new Date().toISOString().split('T')[0]}.xlsx`;
            document.body.appendChild(a);
            a.click();
            
            // Cleanup
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            
        } catch (err) {
            console.error("Download Excel error:", err);
            if (err.response) {
                setError(err.response.data.message || "Failed to download Excel file");
            } else {
                setError("Failed to download Excel file");
            }
        } 
    };

    // incomes
    const addIncome = async(income) =>{
        const token = getToken();
        if (!token) {
            return setError("User not authenticated");
        }
        
        setLoadingState('addIncome', true);
        setError(null); // Clear previous errors
        
        try {
            console.log("Adding income with data:", income);
            console.log("Using token:", token);
            const response = await axios.post(`${BASE_URL}/add-income`, income, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log("Add income response:", response.data);
            
            // Don't call getIncomes here to avoid double loading
            // Instead, optimistically update the state or refresh after success
            await getIncomes();
            
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
        } finally {
            setLoadingState('addIncome', false);
        }
    }

    const getIncomes = async () =>{
        const token = getToken();
        if (!token) {
            return setError("User not authenticated");
        }
        
        setLoadingState('getIncomes', true);
        setError(null); // Clear previous errors
        
        try {
            console.log("Fetching incomes with token:", token);
            const response = await axios.get(`${BASE_URL}/get-income`, {
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
        } finally {
            setLoadingState('getIncomes', false);
        }
    }

    const deleteIncome = async(id) =>{
        const token = getToken();
        if (!token) {
            return setError("User not authenticated");
        }
        
        setLoadingState('deleteIncome', true);
        setError(null); // Clear previous errors
        
        try {
            console.log("Deleting income with ID:", id);
            console.log("Using token:", token);
            const response = await axios.delete(`${BASE_URL}/delete-income/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log("Delete income response:", response.data);
            
            // Refresh the incomes after successful deletion
            await getIncomes();
            
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
        } finally {
            setLoadingState('deleteIncome', false);
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
        
        setLoadingState('addExpense', true);
        setError(null); // Clear previous errors
        
        try {
            console.log("Adding expense with data:", expense);
            console.log("Using token:", token);
            const response = await axios.post(`${BASE_URL}/add-expense`, expense, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log("Add expense response:", response.data);
            
            // Refresh expenses after successful addition
            await getExpenses();
            
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
        } finally {
            setLoadingState('addExpense', false);
        }
    }

    const getExpenses = async () =>{
        const token = getToken();
        if (!token) {
            return setError("User not authenticated");
        }
        
        setLoadingState('getExpenses', true);
        setError(null); // Clear previous errors
        
        try {
            const response = await axios.get(`${BASE_URL}/get-expense`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setExpenses(response.data);
        } catch (err) {
            console.error("Get expenses error:", err);
            setError(err.response?.data?.message || "Failed to fetch expenses");
        } finally {
            setLoadingState('getExpenses', false);
        }
    }

    const deleteExpense = async(id) =>{
        const token = getToken();
        if (!token) {
            return setError("User not authenticated");
        }
        
        setLoadingState('deleteExpense', true);
        setError(null); // Clear previous errors
        
        try {
            await axios.delete(`${BASE_URL}delete-expense/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            // Refresh expenses after successful deletion
            await getExpenses();
            
        } catch (err) {
            console.error("Delete expense error:", err);
            setError(err.response?.data?.message || "Failed to delete expense");
        } finally {
            setLoadingState('deleteExpense', false);
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
            return new Date(b.date) - new Date(a.date)
        })

        return history.slice(0, 3)
    }

    const ViewHistory = () => {
        const view = [...incomes, ...expense]
        view.sort((a, b) => {
            return new Date(b.date) - new Date(a.date)
        })

        return view
    }

    // Check if any loading state is active
    const isAnyLoading = Object.values(loadingStates).some(state => state === true);

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
            ViewHistory,
            downloadExcel,
            loading: isAnyLoading, // Use computed loading state
            loadingStates // Expose individual loading states
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext= () =>{
    return useContext(GlobalContext)
}
