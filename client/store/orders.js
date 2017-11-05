import axios from 'axios'
//import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS'
const GET_ORDER = 'GET_ORDER'
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
const getOrders = orders => ({type: GET_ORDERS, orders})
const getOrder = order => ({type: GET_ORDER, order})
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

/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS:
      return Object.assign({}, {allOrders: action.orders})
    case GET_ORDER:
      return Object.assign({}, {singleOrder: action.order})
    // case REMOVE_ORDER:
    //   return initialState...
    default:
      return state
  }
}
