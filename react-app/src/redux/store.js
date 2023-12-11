import { createStore, combineReducers } from "redux";
import { devToolsEnhancer } from "@redux-devtools/extension";
import { facultiesReducer } from "./reducers/facultiesReducer";

// Valoarea inițială a stării Redux pentru reducer-ul rădăcină
// dacă nu este trecut parametrul preloadedState.

export const rootReducer = combineReducers({
  faculties: facultiesReducer,
});

// const rootReducer = (state = initialState, action) => {
//   switch (action.type) {
//     // În funcție de tipul acțiunii, se va executa o logică diferită.
//     case "faculties/setSearchTerm":
//       return {
//         ...state,
//         faculties: {
//           ...state.faculties,
//           searchTerm: action.payload,
//         },
//       };

//     default:
//       return state;
//   }
// };

const enhancer = devToolsEnhancer();

export const store = createStore(rootReducer, enhancer);
