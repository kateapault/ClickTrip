import React from 'react'

function MonthPrice(props) {
    let avgPrices = props.prices
    return(
        <div className="month">
            <div className="month-title">{props.month}</div>
            <div className="basic-avg avg">
                <div className="avg-price-label">Average Flight:</div>
                <div className="avg-price">${parseFloat(avgPrices[0]).toFixed(2)}</div>
            </div>
            <div className="nonstop-avg avg">
                <div className="avg-price-label">Average Nonstop:</div>
                <div className="avg-price">{parseFloat(avgPrices[1]).toFixed(2) === "NaN" ? "n/a" : `\$${parseFloat(avgPrices[1]).toFixed(2)}`}</div>
            </div>
            <div className="withstop-avg avg">
                <div className="avg-price-label">Average Multileg:</div>
                <div className="avg-price">${parseFloat(avgPrices[2]).toFixed(2)}</div>
            </div>
        </div>
    )
}

export default MonthPrice