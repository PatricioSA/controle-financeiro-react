import './App.css'
import { useState, useEffect } from 'react'
import TotalBalance from './components/TotalBalance/TotalBalance'
import TotalSpending from './components/TotalSpending/TotalSpending'
import TotalSaved from './components/TotalSaved/TotalSaved'
import useTransactionsCollection from './hooks/useTransactionsCollection'
import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js'
import MainChart from './components/MainChart'
import MyChart from './components/Chart'
import Transaction from './components/Transaction/Transaction'
import Modal from 'react-modal'
import MyModal from './components/MyModal/MyModal'

Chart.register(CategoryScale)
Modal.setAppElement('#root')

function App() {
  const { transactions, addTransaction, removeTransaction } = useTransactionsCollection()
  const [activeComponent, setActiveComponent] = useState('TotalBalance');
  const [showChart, setShowChart] = useState(true); // Estado para controlar a exibição do gráfico
  const [modalIsOpen, setIsOpen] = useState(false)

  const handleComponentChange = (component) => {
    setActiveComponent(component);
    setShowChart(component === 'TotalBalance'); // Mostrar gráfico apenas quando 'TotalBalance' estiver ativo
  };

  function calculateIncomes() {
    let totalIncome = transactions
      .filter(transaction => transaction.transactionType === 'receita')
      .reduce((total, transaction) => total + transaction.amount, 0);
    return totalIncome
  }

  function calculateExpenses() {
    let totalExpanses = transactions
      .filter(transaction => transaction.transactionType === 'despesa')
      .reduce((total, transaction) => total + transaction.amount, 0);
    return totalExpanses
  }

  function calculateCategoryTotal() {
    const totalSpendingPerCategory = (accumulator, transaction) => {
      accumulator[transaction.category] = accumulator[transaction.category] || 0
      accumulator[transaction.category] += transaction.amount
      return accumulator
    }

    const categoryTotal = transactions.reduce(totalSpendingPerCategory, {});
    return categoryTotal;
  }

  const chartData = {
    labels: ['Receitas', 'Despesas'],
    datasets: [
      {
        backgroundColor: ['green', 'red'],
        hoverOffset: 4,
        borderColor: 'black',
        data: [calculateIncomes() || 1, calculateExpenses() || 1],
      },
    ],
  };
  
  const categoryChartData = {
    labels: Object.keys(calculateCategoryTotal()),
    datasets: [{
      backgroundColor: ['green', 'blue', 'yellow', 'orange', 'purple'],
      borderColor: 'black',
      data: Object.values(calculateCategoryTotal())
    }]
  }

  useEffect(() => {
    // Atualiza os valores do gráfico sempre que as transações mudarem
    chartData.datasets[0].data = [calculateIncomes() || 1, calculateExpenses() || 1];
    categoryChartData.datasets[0].data = Object.values(calculateCategoryTotal());
  });

  function openModal() {
    setIsOpen(true)
  }

  function cloceModal() {
    setIsOpen(false)
  }

  return (
    <>
      <section className='balances'>
        <TotalBalance className={activeComponent === 'TotalBalance' ? 'active' : ''} onClick={() => handleComponentChange('TotalBalance')} totalBalance={calculateIncomes() - calculateExpenses()} />
        <TotalSpending className={activeComponent === 'TotalSpending' ? 'active' : ''} onClick={() => handleComponentChange('TotalSpending')} spending={calculateExpenses()} />
        <TotalSaved className={activeComponent === 'TotalSave' ? 'active' : ''} onClick={() => handleComponentChange('TotalSave')} incomes={calculateIncomes()} />
      </section>

      <MyModal isOpen={modalIsOpen} onRequestClose={cloceModal} addTransaction={addTransaction} />

      <section>
        {activeComponent === 'TotalBalance' && showChart &&
          <div style={{ maxWidth: '700px', margin: '3rem 0', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', backgroundColor: '#fff', borderRadius:'.5rem' }}>
            <MainChart charData={chartData}/>
            <MyChart charData={categoryChartData} />
          </div>
        }

        {activeComponent === 'TotalSpending' && !showChart && (
          <section className='transactions'>
            {transactions
              .filter(transaction => transaction.transactionType === 'despesa')
              .map((transaction) => (
                <Transaction
                  key={transaction.id}
                  transactionName={transaction.transactionName}
                  transactionValue={transaction.amount}
                  expenseOrIncome={transaction.transactionType}
                  onRemove={() => removeTransaction(transaction.id)}
                />
              ))}
          </section>
        )}

        {activeComponent === 'TotalSave' && !showChart && (
          <section className='transactions'>
            {transactions
              .filter(transaction => transaction.transactionType === 'receita')
              .map((transaction) => (
                <Transaction
                  key={transaction.id}
                  transactionName={transaction.transactionName}
                  transactionValue={transaction.amount}
                  expenseOrIncome={transaction.transactionType}
                  onRemove={() => removeTransaction(transaction.id)}
                />
              ))}
          </section>
        )}
      </section>

      <button id="btn-new-transaction" onClick={openModal}>
        <span className="material-symbols-outlined">
          add
        </span>
      </button>
    </>
  )
}

export default App
