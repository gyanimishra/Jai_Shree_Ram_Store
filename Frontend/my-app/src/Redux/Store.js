import { createStore , combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailsReducer, productReducer } from "./Reducers/ProductReducer";
import { userReducer } from "./Reducers/userReducer";

const reducer = combineReducers({
products: productReducer,
productdetails:productDetailsReducer,
user: userReducer
})


const middleware = [thunk];

const initialState={}

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;