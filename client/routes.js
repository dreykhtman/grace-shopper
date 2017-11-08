import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Router, Redirect} from 'react-router'
import {Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {Main, Login, Signup, UserHome, AllProducts, Navbar, Footer, Help, About, Contact, SingleProduct, Cart, Orders, SingleOrder, AllUsers, EditUserForm, FilteredProducts, AccountPage, OrderConfirmation} from './components'
import {me, fetchProducts, fetchCart, fetchAllUsers} from './store'


/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData(this.props.user.id);
    this.getCartId = this.getCartId.bind(this);
  }

  getCartId(userId) {
    this.props.getCart(userId)
  }

  render () {
    const {isLoggedIn, isAdmin} = this.props;
    let userId = this.props.user.id
    if (userId) this.getCartId(userId);

    return (
      <Router history={history}>
        <Main>
          <Navbar />
            <Switch>
              {/* Routes placed here are available to all visitors */}
              {/* <Redirect from="/" to="/home" /> */}
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/help" component={Help} />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Route exact path="/products" component={AllProducts} />
              <Route exact path="/products/:id" component={SingleProduct} />
              <Route exact path="/products/category/:categoryName" component={AllProducts} />
              <Route exact path="/" component={UserHome} />
              <Route exact path="/home" component={UserHome} />
              <Route exact path="/search" component={FilteredProducts} />
              {
                isLoggedIn &&
                  <Switch>
                    {/* Routes placed here are only available after logging in */}
                    <Route path="/users/:userId/orders/:orderId" component={SingleOrder} />
                    <Route path="/users/:userId/orders" component={Orders} />
                    <Route exact path="/users/:userId/cart" component={Cart} />
                    <Route exact path="/users/:userId/orderConfirmation" component={OrderConfirmation} />
                    <Route path="/account" component={AccountPage} />
                    <Route exact path="/users/:userId" component={EditUserForm} />
                    {
                      isAdmin &&
                      <Switch>
                        <Route exact path="/users" component={AllUsers} />
                      </Switch>
                    }
                  </Switch>
              }
              {/* Displays our Login component as a fallback */}
              {
                //Removing from homepage until we populate home page based off user being logged in or not.
                //<Route component={Login} />
              }
            </Switch>
          <Footer />
        </Main>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin,
    user: state.user
  }
}

// const mapDispatch = (dispatch) => {
//   return {
//     loadInitialData (userId) {
//       dispatch(me())
//       dispatch(fetchProducts())
//       dispatch(fetchAllUsers())
//       //dispatch(fetchCart(userId))
//     }
//   }
// }

const mapDispatch = dispatch => ({
  loadInitialData: () => {
    dispatch(me())
    dispatch(fetchProducts())
    dispatch(fetchAllUsers())
  },
  getCart: (userId) => dispatch(fetchCart(userId))
})

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
