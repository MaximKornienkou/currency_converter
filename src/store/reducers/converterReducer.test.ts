import {ConverterInitialStateType, converterReducer, setBaseCurrency, setCurrencies} from "./converterReducer";


let startState: ConverterInitialStateType;

beforeEach(() => {

    startState = {
        baseCurrency: "",
        currenciesData: {},
    }
});

test("set currencies data", () => {

    const currencies = {
        "EUR": {
            "code": "EUR",
            "value": 0.031029
        },
        "UAH": {
            "code": "UAH",
            "value": 1
        },
        "USD": {
            "code": "USD",
            "value": 0.034035
        }
    }

    const endState = converterReducer(startState, setCurrencies(currencies));

    expect(endState.currenciesData["EUR"].value).toBe(0.031029);
    expect(endState.currenciesData["UAH"].value).toBe(1);
    expect(endState.currenciesData["USD"].value).toBe(0.034035);
});

test("set base currency", () => {

    const baseCurrency = "UAH";

    const endState = converterReducer(startState, setBaseCurrency(baseCurrency));

    expect(endState.baseCurrency).toBe("UAH");
});