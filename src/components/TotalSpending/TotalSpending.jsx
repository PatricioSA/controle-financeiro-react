import PropTypes from 'prop-types'
import wallet from '/images/carteira.png'

TotalSpending.propTypes = {
    onClick: PropTypes.func,
    spending: PropTypes.number,
    className: PropTypes.any
}

export default function TotalSpending({onClick, spending, className}) {
    return (
        <div onClick={onClick} className={`container ${className}`}>
            <div className={className}>
                <img src={wallet} alt="ícone" />
            </div>
            <p>Gastos Totais</p>
            <h2 style={{color: 'red'}}>R${spending}</h2>
        </div>
    )
}