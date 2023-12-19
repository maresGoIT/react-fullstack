import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import citiesService from "../../pages/common/service/citiesService";

// Cum va arata state-ul initial
const initialState = {
  status: "idle",
  error: "",
  items: [],
};

export const fetchCities = createAsyncThunk("cities/fetchCities", async () => {
  return citiesService.get();
});

export const addCity = createAsyncThunk(
  "cities/addCity",
  // The payload creator receives the partial `{title, content, user}` object
  async (initialPost) => {
    return citiesService.create(initialPost);
  }
);

export const deleteCity = createAsyncThunk(
  "cities/deleteCity",
  // The payload creator receives the partial `{title, content, user}` object
  async (initialPost) => {
    return citiesService.remove(initialPost);
  }
);

export const updateCity = createAsyncThunk(
  "cities/updateCity",
  // The payload creator receives the partial `{title, content, user}` object
  async (initialPost) => {
    return citiesService.update(initialPost);
  }
);

const citiesSlice = createSlice({
  name: "cities",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // READ
    builder
      .addCase(fetchCities.pending, (state, _action) => {
        state.status = "loading";
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // CREATE
      .addCase(addCity.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addCity.rejected, (state, action) => {
        state.error = action.error.message;
      })
      // DELETE
      .addCase(deleteCity.fulfilled, (state, action) => {
        const index = state.items.findIndex((el) => el.id === action.payload);

        state.items.splice(index, 1);
      })
      .addCase(deleteCity.rejected, (state, action) => {
        state.error = action.error.message;
      })
      // UPDATE
      .addCase(updateCity.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (el) => el.id === action.payload.id
        );

        if (index !== -1) {
          state.items[index] = { ...action.payload };
        }
      })
      .addCase(updateCity.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

// Exportăm generatoarelor de acțiuni și reducer-ul
export const citiesReducer = citiesSlice.reducer;
