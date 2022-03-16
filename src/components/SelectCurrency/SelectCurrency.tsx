import React, {ChangeEvent} from "react";
import styles from './SelectCurrency.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../store/store";
import {CurrenciesDataType} from "../../api/api";
import {getCurrenciesRates} from "../../store/reducers/converterReducer";
import {storage} from "../../storage/storage";


export const SelectCurrency = () => {

    const dispatch = useDispatch();
    const currenciesData = useSelector<AppStoreType, CurrenciesDataType>((state) =>
        state.converterReducer.currenciesData);

    const currencies = ["Select currency", ...Object.keys(currenciesData)];

    const changeCurrency = (event: ChangeEvent<HTMLSelectElement>) => {
        storage.setItem("currency", event.currentTarget.value);
        dispatch(getCurrenciesRates(event.currentTarget.value));
    }

    return (
        <>
            <div className={styles.selectCurrencyBack}/>
            <div className={styles.selectCurrency}>
                Select your currency
                <select onChange={changeCurrency}>
                    {currencies.map((currency) => <option key={currency}>{currency}</option>)}
                </select>
            </div>
        </>
    );
}
