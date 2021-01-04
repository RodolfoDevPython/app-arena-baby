import { combineReducers } from "redux";


import stepReducer from "./steps";
import filterCategory from "./filterCategory";
import resultCategory from "./resultCategory";


export default combineReducers({
    step: stepReducer,
    filterCategory,
    resultCategory
});