import axios from 'axios';

const API_URL = 'http://localhost:3001/api/transaction/';

async function allTransactions(period){
    const res = await axios.get(`${API_URL}all?period=${period}`);
    return(res.data);
}

async function getTransactionsFilter(period, description){
    const res = await axios.get(`${API_URL}getTransactionsFilter?period=${period}&description=${description}`);
    return(res.data);
}

async function getTransaction(id){
    const res = await axios.get(`${API_URL}getTransaction/${id}`);
    return(res.data);
}

async function updateTransaction(id, data){
    const res = await axios.put(`${API_URL}updateTransaction/${id}`, data);
    return(res.data);
}

async function addTransaction(data){
    const res = await axios.post(`${API_URL}addTransaction/`, data);
    console.log(res.data);
    return(res.data);
}

async function deleteTransaction(id){
    const res = await axios.delete(`${API_URL}deleteTransaction/${id}`);
    return(res.data);
}

export { allTransactions, getTransaction, updateTransaction, addTransaction, deleteTransaction, getTransactionsFilter };