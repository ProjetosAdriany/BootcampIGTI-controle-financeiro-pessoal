import React from 'react';
import css from './transaction.module.css';
import Action from './Action';
import formatHelper  from '../helpers/formatHelper';

export default function Transaction({transactions = [], onDelete, onPersist}) {

    const handleActionClick = (id, type) =>{
        if(type === 'delete'){
            onDelete(id);
            return;
        }
        onPersist(id);
    };

    return (
        <div>
            {transactions.map(({ category, description, value, type, _id, day }) => {
                let color = '';
                (type === '-' ? color = '#ef9a9a' : color = '#a5d6a7');
                return (
                    <div className={css.container} key={_id} style={{backgroundColor: color}}>
                        <div style={{ marginLeft: '5px', marginRight: '5px', fontWeight: 'bold' }}>{day}</div>
                        <div className={css.description}>
                            <div style={{fontWeight: 'bold'}}>{category}</div>
                            <div>{description}</div>
                        </div>
                        <div style={{fontWeight: 'bold'}}>{formatHelper.formatCurrency(value)}</div>
                        <div>
                            <Action onActionClick={handleActionClick} id={_id} type="edit"/>
                            <Action onActionClick={handleActionClick} id={_id} type="delete"/>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
