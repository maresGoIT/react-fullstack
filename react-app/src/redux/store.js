import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { facultiesReducer } from "./slices/facultiesSlice";
import { facultiesSearchTermReducer } from "./slices/facultiesSearchTermSlice";
import { citiesReducer } from "./slices/citiesSlice";
import { tutorsReducer } from "./slices/tutorsSlice";
import { tutorsFilterReducer } from "./slices/tutorsFilterSlice";
import { authReducer } from "./slices/authSlice";

// In store, pentru fiecare "particica" din state-ul aplicatie, o sa asignam un reducer, care se va ocupa exclusiv de
// logica pentru acea particica
/*
OBIECTUL DE STATE VA FI: 
{
  cities: [...lista de orase],
  faculties: [...lista de facultati],
  facultiesSearchTerm: "",
  tutors: [...lista de tutori],
}
*/

const reducers = combineReducers({
  auth: authReducer,
  cities: citiesReducer,
  faculties: facultiesReducer,
  facultiesSearchTerm: facultiesSearchTermReducer,
  tutors: tutorsReducer,
  tutorsFilter: tutorsFilterReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
