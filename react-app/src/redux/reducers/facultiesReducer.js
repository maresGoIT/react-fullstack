const initialState = {
  list: [
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
  ],
  searchTerm: "",
};

export const facultiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "faculties/addFaculty":
      return {
        ...state,
        list: [...state.list, action.payload],
      };

    case "faculties/deleteFaculty":
      return {
        ...state,
        list: state.list.filter((el) => el.id !== action.payload),
      };

    case "faculties/setSearchTerm":
      return {
        ...state,
        searchTerm: action.payload,
      };

    default:
      return state;
  }
};
