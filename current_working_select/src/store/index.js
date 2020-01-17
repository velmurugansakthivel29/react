import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
// import { createLogger } from "redux-logger";
import rootReducer from "../reducers/index";

const middleWares = [thunk];

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 })
    : compose;

const composedEnhancers = composeEnhancers(applyMiddleware(...middleWares));

export default createStore(rootReducer, composedEnhancers);
