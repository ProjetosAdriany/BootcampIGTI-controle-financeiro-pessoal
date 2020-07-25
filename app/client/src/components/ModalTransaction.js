import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import dataHelper from '../helpers/dataHelper';

Modal.setAppElement('#root');
export default function ModalTransaction({selectedTransaction, onClose, onSave}) {
    
    let id = 0;
    let transaction = "";

    if(selectedTransaction[0]){
        id = selectedTransaction[0]._id;
        transaction = selectedTransaction[0];        
    }
    
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const [category, setCategory] = useState('');
    const [type, setType] = useState('+');
    const [yearMonthDay, setYearMonthDay] = useState();

    useEffect(() => { 
        setDescription(transaction.description || '');
        setValue(transaction.value || '');
        setCategory(transaction.category || '');
        setType(transaction.type || '+');
        setYearMonthDay(transaction.yearMonthDay || dataHelper.getLocalDateNow());
    }, [transaction]);
    

    const handleModalClose = () => {
        onClose(null);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleYearMonthDayChange = (event) => {
        setYearMonthDay(event.target.value);
    };

    const handleValueChange = (event) => {
        setValue(event.target.value);
    };

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const formData = {
            description,
            category,
            value,
            yearMonthDay,
            type
        };
        onSave(id, formData);
        onClose(null);
    };
    
    return (
        <div>
            <Modal isOpen={true}>
                <div style={styles.flexRow}>
                    <span style={styles.title}>Edição de Lançamento</span>
                    <button
                        className="waves-effect waves-lights btn red dark-4"
                        onClick={handleModalClose}
                    >
                        X
                    </button>
                </div>
                <form onSubmit={handleFormSubmit}>
                 
                    <div className="input-field">
                        <input id="inputType" type="text" value={type} onChange={handleTypeChange}/>
                        <label className="active" htmlFor="inputType">
                        Tipo
                        </label>
                    </div>

                    <div className="input-field">
                        <input id="inputDescription" type="text" value={description} onChange={handleDescriptionChange}/>
                        <label className="active" htmlFor="inputDescription">
                        Descrição
                        </label>
                    </div>

                    <div className="input-field">
                        <input id="inputCategory" type="text" value={category}  onChange={handleCategoryChange}/>
                        <label className="active" htmlFor="inputCategory">
                        Categoria
                        </label>
                    </div>

                    <div className="input-field">
                        <input id="inputValue" type="text" value={value} onChange={handleValueChange} />
                        <label className="active" htmlFor="inputValue">
                        Valor
                        </label>
                    </div>

                    <div className="input-field">
                        <input id="inputDate" type="text" value={yearMonthDay} onChange={handleYearMonthDayChange}/>                   
                    </div>

                
                    <div style={styles.flexRow}>
                        <button
                        className="waves-effect waves-light btn"
                        >
                        Salvar
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

const styles = {
    flexRow: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '40px',
    },
  
    title: {
      fontSize: '1.3rem',
      fontWeight: 'bold',
    }
  };
