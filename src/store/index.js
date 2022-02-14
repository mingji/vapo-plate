import { createStore, compose, applyMiddleware } from "redux";
import { rootReducer } from "./reducers";

import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const enhancer = compose(applyMiddleware(thunk, logger));
const enhancer = composeEnhancers(applyMiddleware(thunk, createLogger()));
let store = createStore(rootReducer, enhancer);
export { store };
