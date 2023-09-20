//redux imports
import { createSlice } from "@reduxjs/toolkit";

const initialState = { tabs: "1", searchResult: "", searchInput: "" };

const tabsSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    tabsHandler: (state, action) => {
      state.tabs = action.payload;
    },
    searchHandler: (state, action) => {
      // console.log("action.payload", action.payload);
      state.searchInput = action.payload;
    },
    searchInputHandler: (state, action) => {
      // console.log("action.payload", action.payload);
      state.searchInput = action.payload;
    },

    clearSearchHandler: (state, action) => {
      state.searchInput = "";
    },
  },
});

export const {
  tabsHandler,
  searchHandler,
  clearSearchHandler,
  searchInputHandler,
} = tabsSlice.actions;

export default tabsSlice.reducer;
