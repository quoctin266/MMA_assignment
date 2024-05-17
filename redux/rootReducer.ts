import { combineReducers } from "redux";
import perfumeReducer from "./slices/perfume.slice";

export const rootReducer = combineReducers({
  perfume: perfumeReducer,
});
