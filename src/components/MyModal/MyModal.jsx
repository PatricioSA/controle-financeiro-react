import { useState } from "react"
import PropTypes from 'prop-types'
import Modal from "react-modal"
import style from './style.module.css'

Modal.setAppElement('#root')

MyModal.propTypes = {
    addTransaction: PropTypes.func,
    isOpen: PropTypes.bool,
    onRequestClose: PropTypes.func
}

export default function MyModal({ addTransaction, isOpen, onRequestClose }) {
    const [transactionName, setTransactionName] = useState('')
    const [amount, setAmount] = useState('')
    const [category, setCategory] = useState('')
    const [transactionType, setTransactionType] = useState('');

    const handleSubmit = (ev) => {
        ev.preventDefault()
        addTransaction({ transactionName, transactionType, amount: parseFloat(amount), category, })
        setTransactionName('')
        setAmount('')
        setCategory('')
        setTransactionType('')
        onRequestClose()
    }

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
            <h1>Nova Transação</h1>
            <form onSubmit={handleSubmit}>
                <div className={style.inputsRadios}>
                    <div>
                        <label>Receitas</label>
                        <input required type="radio" tabIndex='0' name="tipo-transacao" value="receita" checked={transactionType == 'receita'} onChange={(e) => setTransactionType(e.target.value)} />
                    </div>
                    <div>
                        <label>Despesas</label>
                        <input required type="radio" tabIndex='1' name="tipo-transacao" value="despesa" checked={transactionType == 'despesa'} onChange={(e) => setTransactionType(e.target.value)} />
                    </div>
                </div>

                <input required type="number" placeholder="Valor" tabIndex='2' value={amount} onChange={(e) => setAmount(e.target.value)} className={style.inputText} />
                <input required type="text" placeholder="Nome da Transação" tabIndex='3' value={transactionName} onChange={(e) => setTransactionName(e.target.value)} className={style.inputText} />
                <input required type="text" placeholder="Categoria" tabIndex='4' value={category} onChange={(e) => setCategory(e.target.value)} className={style.inputText} />
                <div>
                    <button className={style.button}>Adicionar</button>
                </div>
            </form>
        </Modal>
    )
}

const customStyles = {
    content: {
        width: 300,
        height: 350,
        margin: '0 auto',
        // padding: '1rem 0',
        top: '20%',
        border: 'none',
        borderRadius: '.5rem',
        boxShadow: '0 0 1em rgb(0 0 0 / .3)',
        textAlign: 'center',
    },
};