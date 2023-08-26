/* eslint-disable react/prop-types */
import style from './style.module.css'

export default function Transaction({ transactionName, transactionValue, expenseOrIncome, onRemove }) {
    return (
        <div className={style.container}>
            <div>
                <p>{transactionName}</p>
                {
                    expenseOrIncome === 'receita' ?
                        <p style={{ color: 'green' }}>+R${transactionValue}</p> :
                        <p style={{ color: 'red' }}>-R${transactionValue}</p>
                }
            </div>
            <button onClick={onRemove}><span className="material-symbols-outlined">delete</span></button>
        </div>
    )
}