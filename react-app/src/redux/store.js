import { configureStore } from "@reduxjs/toolkit";
import { facultiesReducer } from "./slices/facultiesSlice";
import { facultiesSearchTermReducer } from "./slices/facultiesSearchTermSlice";
import { citiesReducer } from "./slices/citiesSlice";
import { tutorsReducer } from "./slices/tutorsSlice";
import { tutorsFilterReducer } from "./slices/tutorsFilterSlice";

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
const store = configureStore({
  reducer: {
    cities: citiesReducer,
    faculties: facultiesReducer,
    facultiesSearchTerm: facultiesSearchTermReducer,
    tutors: tutorsReducer,
    tutorsFilter: tutorsFilterReducer,
  },
});

export default store;
