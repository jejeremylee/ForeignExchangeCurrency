import React from "react";
import Currencies from "../currencies/currencies"
import "./targetCurrency.css";

export default function TargetCurrency({targetCurrency, currencyRates, currencyAmounts}) {

    let currencyAmount;
    let currencyRate;

    if (currencyRates[0][targetCurrency] === undefined){
        currencyAmount = (currencyAmounts*currencyRates[0][targetCurrency]);
        currencyRate = (currencyRates[0][targetCurrency]);
    }
    else {
        currencyAmount = (currencyAmounts*currencyRates[0][targetCurrency]).toFixed(4);
        currencyRate = (currencyRates[0][targetCurrency]).toFixed(4);
    }
    
    return (
     <div className="target-currency">
        <div className="currency-info">
            <div className="currencies-container">
                <Currencies currency={targetCurrency}/>
            </div>
            <div className='currency-info-content'>
                <div className="currency-amount">
                    {currencyAmount}
                </div>
                <div className="currency-rate">
                    1 USD = {targetCurrency} {currencyRate}
                </div>
            </div>
        </div>
     </div>
    );

}
