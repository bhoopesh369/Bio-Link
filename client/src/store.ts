import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers"; // defaults to localStorage for web

const store = configureStore({
	reducer: rootReducer,
});

export default store;
