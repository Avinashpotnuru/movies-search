import restApi from "../api/restApis";

import tabsSlice from "./tabsSlice";

const rootReducer = {
  tabsSlice: tabsSlice,
  [restApi.reducerPath]: restApi.reducer,
};

export default rootReducer;
