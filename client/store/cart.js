import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART';
const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';

/**
 * INITIAL STATE
 */
const defaultCart = {};

/**
 * ACTION CREATORS
 */

export function addItem(item) {
    return { type: ADD_ITEM, item }
}
export function removeItem(item) {
    return { type: REMOVE_ITEM, item }
}
export function getCart(cart) {
    return { type: GET_CART, cart }
}

/**
 * THUNK CREATORS
 */

export function fetchOrder (orderId) {

      return function thunk (dispatch) {
        return axios.get(`/api/orders/${orderId}`)
          .then(res => res.data)
          .then(order => {
            const action = getCart(order);
            dispatch(action);
          });
      };
}



/**
 * REDUCER
 */

export default function (state = defaultCart, action) {
    let newState;
    switch (action.type) {
        case GET_CART:
            newState = Object.assign({}, state, { cart: action.cart });
            break;
        case ADD_ITEM:
            newState = Object.assign({}, state, { cart: [...action.cart, action.item] });
            break;
        case REMOVE_ITEM:
            newState = Object.assign({}, state, { cart: action.cart.splice(action.cart.indexOf(action.item)) });
            break;
        default:
            newState = state;
    }
    return newState;
}

