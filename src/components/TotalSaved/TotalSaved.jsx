import PropTypes from 'prop-types'

TotalSaved.propTypes = {
    onClick: PropTypes.func,
    incomes: PropTypes.number,
    className: PropTypes.any
}

export default function TotalSaved({onClick, incomes, className}) {
    return (
        <div onClick={onClick} className={`container ${className}`}>
            <div className={className}>
                <img src="/money-bag.png" alt="ícone" />
            </div>
            <p>Receitas Totais</p>
            <h2 style={{color: 'green'}}>R${incomes}</h2>
        </div>
    )
}