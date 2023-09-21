//redux imports
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tabs: "1",
  searchResult: "",
  searchInput: "",
  navToggle: false,
};

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

    openNav: (state, action) => {
      state.navToggle = true;
    },
    closeNav: (state, action) => {
      state.navToggle = false;
    },
  },
});

export const {
  tabsHandler,
  searchHandler,
  clearSearchHandler,
  searchInputHandler,
  closeNav,
  openNav,
} = tabsSlice.actions;

export default tabsSlice.reducer;
