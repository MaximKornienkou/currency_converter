import React, {ChangeEvent, useState} from "react";
import styles from "./Converter.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../store/store";
import {CurrenciesDataType} from "../../api/api";
import {getCurrenciesRates} from "../../store/reducers/converterReducer";

export const Converter = () => {

    const [amount, setAmount] = useState(1);
    const [toCurrency, setToCurrency] = useState("USD");

    const dispatch = useDispatch();

    const currenciesData = useSelector<AppStoreType, CurrenciesDataType>((state) =>
        state.converterReducer.currenciesData);
    const baseCurrency = useSelector<AppStoreType, string>((state) =>
        state.converterReducer.baseCurrency);

    const currencies = Object.keys(currenciesData);
    const currenciesFrom = [baseCurrency, ...currencies]
    const currenciesTo = [toCurrency, ...currencies]

    const changeAmount = (event: ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(event.currentTarget.value));
    }

    const changeFromCurrency = (event: ChangeEvent<HTMLSelectElement>) => {
        dispatch(getCurrenciesRates(event.currentTarget.value));
    }
    const changeToCurrency = (event: ChangeEvent<HTMLSelectElement>) => {
        setToCurrency(event.currentTarget.value);
    }

    const currencyRate = currenciesData[toCurrency]?.value
        ? currenciesData[toCurrency].value
        : 0;

    const result = Math.round(amount * currencyRate * 10000) / 10000;

    return (
        <main className={styles.converter}>
            <h3>Currency converter</h3>
            <form>
                <div>
                    <label htmlFor="amount">Amount</label>
                    <input id="amount"
                           type="number"
                           min={0}
                           value={amount}
                           onChange={changeAmount}
                    />
                </div>
                <div>
                    <label htmlFor="fromCurrency">From</label>
                    <select id="fromCurrency"
                            onChange={changeFromCurrency}>
                        {currenciesFrom.map((currency, index) => <option key={index}>{currency}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="toCurrency">To</label>
                    <select id="toCurrency"
                            onChange={changeToCurrency}>
                        {currenciesTo.map((currency, index) => <option key={index}>{currency}</option>)}
                    </select>
                </div>
                {baseCurrency ? <div>{amount} {baseCurrency} = {result} {toCurrency}</div> : ""}
            </form>
        </main>
    )
}

export default Converter;