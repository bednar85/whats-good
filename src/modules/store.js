import { createStore } from "redux";
import rootReducer from "./application/index";

const store = createStore(rootReducer);

export default store;