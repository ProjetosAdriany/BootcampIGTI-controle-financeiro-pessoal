import React, { useState, useEffect } from 'react';
import * as api from './api/apiService';
import M from 'materialize-css';

import Filter from './components/Filter';
import Transaction from './components/Transaction';
import Modal from './components/ModalTransaction';
import PERIODS from './helpers/periods';
import Sumary from './components/Sumary';


export default function App() {
  
  const [allTransactions, setAllTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [currentPeriod, setCurrentPeriod] = useState(PERIODS[12]);
  const [currentDescription, setCurrentDescription] = useState('');

  useEffect(() => {
      M.AutoInit();
  }, []);

  useEffect(() => {
    const getTransactions = async() => {
      
      const transactions = await api.allTransactions(currentPeriod);      
      setAllTransactions(transactions);
    }  
    getTransactions();
    setIsLoad(false);
  }, [currentPeriod, isLoad]);


  const getTransactionsFilter = async() => {
    const transactions = await api.getTransactionsFilter(currentPeriod, currentDescription);
    setAllTransactions(transactions);
    setIsLoad(false);
  };

  const handleChangeDescription = (description) => {
    setCurrentDescription(description);
    getTransactionsFilter();
  };

  const handlePersist = async(id) => {
    const transaction = await api.getTransaction(id);
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleNewTransaction = () =>{
    setSelectedTransaction('');
    setIsModalOpen(true);
  };

  const handleDelete = async(id) => {
    await api.deleteTransaction(id);
    setIsLoad(true);
  };

  const handlePersistData = async(id, formData) => {    
    if(id !== 0){
      await api.updateTransaction(id, formData);
    }else{
      await api.addTransaction(formData);
    }
    setIsLoad(true);
  };

  const handleClose = () =>{ 
    setIsModalOpen(false);
    setIsLoad(true);
  };

  const handleSelectChange = (event) =>{
    const newPeriod = event.target.value;
    setCurrentPeriod(newPeriod);
  }
  
  
  return (
    <div className="container center">
      <h3>Bootcamp Full Stack - Desafio Final</h3>
      <h4>Constrole Financeiro Pessoal</h4>
      {!isModalOpen && (
        <div className="row center">
          <div className="col s4 offset-s4">
            <select value={currentPeriod} onChange={handleSelectChange}>
              {PERIODS.map((period) => {
                  return <option key={period}>{period}</option>
              })}
            </select>
          </div> 
        </div>
      )}

      <Sumary transactions={allTransactions} />
      <div className="row">
        <div className="input-field col s3">
          {!isModalOpen && (<a className="waves-effect waves-light btn" onClick={handleNewTransaction}>Incluir Transação</a>)}
        </div>
        <div className="input-field col s9">
          <Filter onChangeDescription={handleChangeDescription}/>
        </div>
      </div>
      <Transaction transactions={allTransactions} onDelete={handleDelete} onPersist={handlePersist} />
      {isModalOpen && (<Modal selectedTransaction={selectedTransaction} onClose={handleClose} onSave={handlePersistData} />)}
    </div>
  );
}
