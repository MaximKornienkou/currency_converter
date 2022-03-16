import React from "react";
import styles from "./ExchangeRates.module.scss"
import {useSelector} from "react-redux";
import {AppStoreType} from "../../store/store";
import {CurrenciesDataType} from "../../api/api";

export const ExchangeRates = () => {

    const currenciesData = useSelector<AppStoreType, CurrenciesDataType>((state) =>
        state.converterReducer.currenciesData);
    const baseCurrency = useSelector<AppStoreType, string>((state) =>
        state.converterReducer.baseCurrency);

    const exchangeRatesList = Object.keys(currenciesData).map(currency => {
        return <div key={currency}>
            1 {currency} = {Math.round(1 / currenciesData[currency].value * 10000) / 10000} {baseCurrency}</div>
    });

    return (
        <main className={styles.exchangeRates}>
            <h1>Current exchange rates</h1>
            <h3>Base currency - {baseCurrency}</h3>
            <div className={styles.exchangeRatesListWrapper}>
                {exchangeRatesList}
            </div>
        </main>
    )
}

export default ExchangeRates;