import { createStore, sagaMiddleware} from "./configStore";
import { cardsSlice, initialState } from "../components/assets/cardsSlice"
import { rootWatcher } from "./rootWatcher"

export const rootState = {
    cardsState: initialState,
};

export const store = createStore<typeof rootState>(
    {
        cardsState: cardsSlice.reducer
    }
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

sagaMiddleware.run(rootWatcher);
