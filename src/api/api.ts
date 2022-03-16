import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    baseURL: "https://api.currencyapi.com/v3/",
    withCredentials: true,
});

export const ConverterApi = {
    getCurrenciesRates(baseCurrency: string) {
        return instance.get<AxiosResponse<CurrenciesDataType>>
        (`latest?apikey=kzmfXuUIgifLNLBun6cFL8V0UTDvRe97oc24ufwQ&base_currency=${baseCurrency}`);
    }
}

export type CurrenciesDataType = {
    [key: string]: Currency
}
export type Currency = {
    code: string,
    value: number,
}