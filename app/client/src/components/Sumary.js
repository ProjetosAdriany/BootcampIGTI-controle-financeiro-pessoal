import React from 'react'
import Balance from './Balance';
import Income from './Income';
import Outgoings from './Outgoings';
import EntriesCount from './EntriesCount';

import css from './sumary.module.css';

export default function Sumary({transactions = []}) {
    const receitas = transactions
    .filter((transaction) => transaction.type === '+')
    .map((transaction) => transaction.value)
    .reduce((acc, crr) => acc + crr, 0);

  const despesas = -transactions
    .filter((transaction) => transaction.type === '-')
    .map((transaction) => transaction.value)
    .reduce((acc, crr) => acc + crr, 0);
  return (
    <div className={`${css.div} row`}>
      <div className="col s3">
        <EntriesCount count={transactions.length} />
      </div>
      <div className="col s3">
        <Income receitas={receitas} />
      </div>

      <div className="col s3">
        <Outgoings despesas={despesas} />
      </div>

      <div className="col s3">
        <Balance receitas={receitas} despesas={despesas} />
      </div>
    </div>
  );
}
