import thunk from "redux-thunk";
import Logger from "./Logger";
import { applyMiddleware } from "redux";

export default applyMiddleware(thunk, Logger);
