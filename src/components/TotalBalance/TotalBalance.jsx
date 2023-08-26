import PropTypes from 'prop-types'

TotalBalance.propTypes = {
    onClick: PropTypes.func,
    totalBalance: PropTypes.number,
    className: PropTypes.any
}

export default function TotalBalance({onClick, totalBalance, className}) {
    return (
        <div onClick={onClick} className={`container ${className}`}>
            <div className={className}>
                <img src="/app-wallet-passes.png" alt="ícone" />
            </div>
            <p>Total</p>
            <h2>R${totalBalance}</h2>
        </div>
    )
}