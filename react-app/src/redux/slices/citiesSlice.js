import { createSlice, nanoid } from "@reduxjs/toolkit";

// Cum va arata state-ul initial
const initialState = [
  {
    id: 2,
    name: "San Francisco",
  },
];

// pentru slice, ce avem la name, e ce sa avem in obiectul de state global, de ex, {cities: []}
const citiesSlice = createSlice({
  name: "cities",
  initialState: initialState,
  // Aici o sa adaugam toate functiile care modifica state-ul
  reducers: {
    addCity: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: (item) => {
        return {
          payload: {
            id: nanoid(),
            ...item,
          },
        };
      },
    },
    editCity(state, action) {
      return state.map((item) => {
        if (item.id !== action.payload.id) {
          // This isn't the item we care about - keep it as-is
          return item;
        }

        // Otherwise, this is the one we want - return an updated value
        return {
          ...item,
          ...action.payload,
        };
      });
    },
    deleteCity(state, action) {
      return state.filter((el) => el.id !== action.payload);
    },
  },
});

// Exportăm generatoarelor de acțiuni și reducer-ul
export const { addCity, editCity, deleteCity } = citiesSlice.actions;
export const citiesReducer = citiesSlice.reducer;
