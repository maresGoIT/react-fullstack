import { createSelector } from "@reduxjs/toolkit";

export const selectTutorsFilter = (state) => state.tutorsFilter.value;
export const selectTutors = (state) => state.tutors.items;
export const selectTutorsStatus = (state) => state.tutors.status;
export const selectTutorsError = (state) => state.tutors.error;
export const selectUser = (state) => state.auth;

// export const selectFilteredTutors = (state) => {
//   const list = selectTutors(state);
//   const searchTerm = selectTutorsFilter(state);

//   return searchTerm.length > 0
//     ? list.filter((el) => el.firstName.includes(searchTerm))
//     : list;
// };

export const selectFilteredTutors = createSelector(
  [selectTutors, selectTutorsFilter],
  (list, searchTerm) => {
    return searchTerm.length > 0
      ? list.filter((el) => el.firstName.includes(searchTerm))
      : list;
  }
);
