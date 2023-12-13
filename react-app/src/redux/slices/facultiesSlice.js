import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    name: "Faculty of Math",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi nisi enim atque optio quae accusantium fuga aliquam fugit voluptatem ad eaque facere, consequuntur temporibus odio pariatur dicta molestias ipsum? Laborum.",
  },
  {
    id: 3,
    name: "Faculty of Physics",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi nisi enim atque optio quae accusantium fuga aliquam fugit voluptatem ad eaque facere, consequuntur temporibus odio pariatur dicta molestias ipsum? Laborum.",
  },
];

const facultiesSlice = createSlice({
  name: "faculties",
  initialState: initialState,
  reducers: {
    addFaculty: {
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
    editFaculty(state, action) {
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
    deleteFaculty(state, action) {
      return state.filter((el) => el.id !== action.payload);
    },
  },
});

// Exportăm generatoarelor de acțiuni și reducer-ul
export const { addFaculty, editFaculty, deleteFaculty } =
  facultiesSlice.actions;
export const facultiesReducer = facultiesSlice.reducer;
