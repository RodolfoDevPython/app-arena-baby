import { combineReducers } from "redux";


import stepReducer from "./steps";
import boxMenuCategory from "./boxMenuCategory";
import filterCategory from "./filterCategory";
import orderByCategory from "./orderByCategory";
import menuCategoryMain from "./menuCategoryMain";

export default combineReducers({
    step: stepReducer,
    boxMenuCategory,
    filterCategory,
    orderByCategory,
    menuCategoryMain
});