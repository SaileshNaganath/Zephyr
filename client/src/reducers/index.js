import { combineReducers } from "redux";
import {cartReducer} from './cartReducer.js';
import {orderReducer} from './orderReducer.js';
import {productReducer} from './productReducer.js';
import {userReducer} from './userReducer.js';

export default combineReducers({
    cart:cartReducer,
    order:orderReducer,
    product:productReducer,
    user:userReducer
})