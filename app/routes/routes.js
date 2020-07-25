const express = require('express');
const TransactionModel = require('../models/TransactionModel');
const transactionRouter = express.Router();


/* Apresenta todas as transactions */

transactionRouter.get('/all', async(req, res) => { 

    try{
        const period = req.query.period;
        if(!period){
            res.status(500).send("É necessário informar o parâmetro period, cujo valor deve estar no formato yyyy-mm-dd");
        }   
        
        const transactionJson = await TransactionModel.find({yearMonth: period}).sort({yearMonthDay: 1})
        res.send(transactionJson);
        
    }catch(err){
        res.status(500).send({error: err.message});
    }
});

/* Apresenta as transactions filtrando a descrição */

transactionRouter.get('/getTransactionsFilter', async(req, res) => { 

    try{
        const period = req.query.period;
        const description = req.query.description;
        if(!period){
            res.status(500).send("É necessário informar o parâmetro period, cujo valor deve estar no formato yyyy-mm-dd");
        }   
        
        const regEx = new RegExp(description, 'i');
        const transactionJson = await TransactionModel.find({yearMonth: period, description: regEx}).sort({yearMonthDay: 1})
        res.send(transactionJson);
        
    }catch(err){
        res.status(500).send({error: err.message});
    }
});

/* Apresenta uma transação */

transactionRouter.get('/getTransaction/:id', async(req, res) => { 

    try{
        const transactionId = req.params.id
        const transactionJson = await TransactionModel.find({_id: transactionId})
        res.send(transactionJson);
        
    }catch(err){
        res.status(500).send({error: err.message});
    }
});

/* Inclui uma nova transaction */

transactionRouter.post('/addTransaction', async(req, res) => {
    try{
        const transaction = req.body;
        const {type, description, category, value, yearMonthDay} = transaction;

        
        const objectDate = new Date(yearMonthDay);
        const day = objectDate.getDate();
        const month = objectDate.getMonth() + 1;
        const year = objectDate.getFullYear();
        const yearMonth = `${year}-${month.toString().padStart(2,'0')}`;
        const dateComplete =  `${year}-${month.toString().padStart(2,'0')}-${day.toString().padStart(2,'0')}`;

     
        const newTransaction = {
            description: description,
            value: value,
            category: category,
            year: year,
            month: month,
            day: day,
            yearMonth: yearMonth,
            yearMonthDay: dateComplete,
            type: type
        };
        
        const data = new TransactionModel(newTransaction);  
        data.save(); 
        
        res.send(newTransaction);
    }catch(err){
        res.status(500).send({error: err.message});
    }
});

/* Atualiza uma transaction existente */

transactionRouter.put('/updateTransaction/:id', async(req, res) => {
    try{
        const transactionId = req.params.id
        const transaction = req.body;
        console.log(transaction);
        const {description, category, value, yearMonthDay} = transaction;

        const objectDate = new Date(yearMonthDay);
        const day = objectDate.getDate() + 1;
        const month = objectDate.getMonth() + 1;
        const year = objectDate.getFullYear();
        const yearMonth = `${year}-${month.toString().padStart(2,'0')}`; 

        const newTransaction = {
            description: description,
            value: value,
            category: category,
            year: year,
            month: month,
            day: day,
            yearMonth: yearMonth,
            yearMonthDay: yearMonthDay
        };

        const updateTransction = await  TransactionModel.updateOne(
            {
                '_id': transactionId
            },
            newTransaction
        );
        res.send(newTransaction);

    }catch(err){
        res.status(500).send({error: err.message});
    }
});

/* Excluir uma Transaction */

transactionRouter.delete('/deleteTransaction/:id', async(req, res) => {
    try{
        const transactionId = req.params.id;  
        const transaction = await TransactionModel.deleteOne({'_id': transactionId});
        res.status(200).send("Registro Excluído");
    }catch(err){
        res.status(500).send({error: err.message});
    }
});



module.exports = transactionRouter;
