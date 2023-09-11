import PropTypes from 'prop-types'
import moneyBag from '/images/money-bag.png'

TotalSaved.propTypes = {
    onClick: PropTypes.func,
    incomes: PropTypes.number,
    className: PropTypes.any
}

export default function TotalSaved({onClick, incomes, className}) {
    return (
        <div onClick={onClick} className={`container ${className}`}>
            <div className={className}>
                <img src={moneyBag} alt="ícone" />
            </div>
            <p>Receitas Totais</p>
            <h2 style={className === 'active' ? {color: '#29F709'} : {color: 'green'}}>
                R${incomes}
            </h2>
        </div>
    )
}