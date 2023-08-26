import PropTypes from 'prop-types'

TotalSpending.propTypes = {
    onClick: PropTypes.func,
    spending: PropTypes.number,
    className: PropTypes.any
}

export default function TotalSpending({onClick, spending, className}) {
    return (
        <div onClick={onClick} className={`container ${className}`}>
            <div className={className}>
                <img src="/images/carteira.png" alt="ícone" />
            </div>
            <p>Gastos Totais</p>
            <h2 style={{color: 'red'}}>R${spending}</h2>
        </div>
    )
}