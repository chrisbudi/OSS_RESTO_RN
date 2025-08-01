import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage'
import configReducer from "./reducers/configReducer";

const rootReducer = combineReducers({
    config: configReducer
});

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const configureStore = () => {
    const store = createStore(persistedReducer);
    const persistor = persistStore(store)

    return { store, persistor }
}

export default configureStore;