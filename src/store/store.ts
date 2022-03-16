import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk, {ThunkAction} from "redux-thunk";
import {ConverterActionType, converterReducer} from "./reducers/converterReducer";

const rootReducer = combineReducers({
    converterReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppStoreType = ReturnType<typeof rootReducer>;

export type AppActionsType = ConverterActionType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStoreType, unknown, AppActionsType>