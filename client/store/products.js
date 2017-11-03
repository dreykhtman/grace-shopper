import axios from 'axios'
//import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

/**
 * INITIAL STATE
 */
const initialState = {
  defaultProduct: {},
  allProducts: []
}

/**
 * ACTION CREATORS
 */
const getProducts = products => ({type: GET_PRODUCTS, products})
const removeProduct = () => ({type: REMOVE_PRODUCT})

/**
 * THUNK CREATORS
 */
export const fetchProducts = () =>
  dispatch =>
    axios.get('/api/products')
    .then(res => res.data)
    .then(prods => dispatch(getProducts(prods || initialState.defaultProduct)))
    .catch(err => console.log(err))


/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return Object.assign({}, state, {allProducts: action.products})
    case REMOVE_PRODUCT:
      return initialState.defaultProduct
    default:
      return state
  }
}
