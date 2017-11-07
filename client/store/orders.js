import axios from 'axios'
//import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS'
const GET_ORDER = 'GET_ORDER'
const GET_CART = 'GET_CART'
//const REMOVE_ORDER = 'REMOVE_ORDER'

/**
 * INITIAL STATE
 */
const initialState = {
  allOrders: [],
  singleOrder: {}
}

/**
 * ACTION CREATORS
 */
const getOrders = orders => ({ type: GET_ORDERS, orders })
const getOrder = order => ({ type: GET_ORDER, order })
const getCart = cart => ({type: GET_CART, cart})
//const removeOrder = () => ({type: REMOVE_ORDER})

/**
 * THUNK CREATORS
 */
export const fetchOrders = () =>
  dispatch =>
    axios.get('/api/orders')
      .then(res => res.data)
      .then(orders => dispatch(getOrders(orders)))
      .catch(err => console.log(err))

export const fetchSingleOrder = (orderId) =>
  dispatch =>
    axios.get(`/api/orders/${orderId}`)
      .then(res => res.data)
      .then(order => dispatch(getOrder(order)))
      .catch(err => console.log(err))

export const fetchCart = (orderId) =>
  dispatch =>
    axios.get(`/api/orders/${orderId}/cart`)
      .then(res => res.data)
      .then(cart => dispatch(getCart(cart)))
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS:
      return Object.assign({}, { allOrders: action.orders })
    case GET_ORDER:
      return Object.assign({}, { singleOrder: action.order })
    case GET_CART:
      return Object.assign({}, { cart: action.cart })
    // case REMOVE_ORDER:
    //   return initialState...
    default:
      return state
  }
}
