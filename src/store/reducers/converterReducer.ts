import {ConverterApi, CurrenciesDataType} from "../../api/api";
import {AppThunk} from "../store";

const initialState: ConverterInitialStateType = {
    baseCurrency: "",
    currenciesData: {}
}

export const converterReducer = (state = initialState, action: ConverterActionType): ConverterInitialStateType => {
    switch (action.type) {
        case "CONVERTER/SET-CURRENCIES-DATA":
            return {...state, currenciesData: action.data}
        case "CONVERTER/SET-BASE-CURRENCY":
            return {...state, baseCurrency: action.currency}
        default:
            return state;
    }
}

export const setCurrencies = (data: CurrenciesDataType) => ({type: "CONVERTER/SET-CURRENCIES-DATA", data} as const);
export const setBaseCurrency = (currency: string) => ({type: "CONVERTER/SET-BASE-CURRENCY", currency} as const);

export const getCurrenciesRates = (baseCurrency: string): AppThunk =>
    async (dispatch) => {
        try {
            const result = await ConverterApi.getCurrenciesRates(baseCurrency);
            dispatch(setCurrencies(result.data.data));
            dispatch(setBaseCurrency(baseCurrency));
        } catch (error) {
            console.log(error ? error : "Network error");
        }
    }

export type ConverterActionType = ReturnType<typeof setCurrencies> | ReturnType<typeof setBaseCurrency>

export type ConverterInitialStateType = {
    baseCurrency: string,
    currenciesData: CurrenciesDataType,
}
