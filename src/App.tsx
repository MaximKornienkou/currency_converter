import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Route, Routes} from "react-router-dom";
import "./App.scss";
import {getCurrenciesRates} from "./store/reducers/converterReducer";
import {Navigation} from "./components/Navigation/Navigation";
import {AppStoreType} from "./store/store";
import {SelectCurrency} from "./components/SelectCurrency/SelectCurrency";
import {Home} from "./components/Home/Home";
import {storage} from "./storage/storage";


const Converter = React.lazy(() => import("./pages/Converter/Converter"));
const ExchangeRates = React.lazy(() => import("./pages/ExchangeRates/ExchangeRates"));

function App() {

    const storedCurrency = storage.getItem("currency") ? storage.getItem("currency") : "";

    const baseCurrency = useSelector<AppStoreType, string>((state) => state.converterReducer.baseCurrency);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrenciesRates(storedCurrency));
    }, []);

    return (
        <div className="App">
            {!baseCurrency && <SelectCurrency/>}
            <>
                <Navigation/>
                <Routes>
                    <Route path={"/"} element={(<Home/>)}/>
                    <Route path={"converter"}
                           element={
                               <React.Suspense fallback={<>...</>}>
                                   <Converter/>
                               </React.Suspense>
                           }/>
                    <Route path={"exchange_rates"}
                           element={
                               <React.Suspense fallback={<>...</>}>
                                   <ExchangeRates/>
                               </React.Suspense>
                           }/>
                </Routes>
            </>
        </div>
    );
}

export default App;
