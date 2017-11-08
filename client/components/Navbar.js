import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../store';
import { SearchProducts } from './';


export const Navbar = (props) => {
  const { handleClick, isLoggedIn, isAdmin } = props;

  return (
    <div>
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          {/*logo*/}
          <div className="navbar-header">
            <Link to="/" title="Home">
              <img id="logo" src="https://ultros.io/static/images/fanart/rakiru_1.png" alt="Store logo" />
            </Link>
          </div>
          {/*search input*/}
          <div>
            <SearchProducts products={props.allProducts} />
          </div>
          
          <Link to={`/users/${props.userId}/cart`} title="Cart">
            <button className="btn btn-outline-secondary navbar-btn" id="cart">
              <i className="material-icons">shopping_cart</i>
            </button>
          </Link>
          
          {
            isLoggedIn
              ? <div>
                {/* The navbar will show these links after you log in
                Have to add account button when logged in as well*/}
                <a className="btn btn-outline-secondary navbar-btn" href="#" onClick={handleClick}>Logout</a>
                <Link className="btn btn-outline-secondary navbar-btn" to="/account">My Account</Link>
              </div>
              : <div>
                {/* The navbar will show these links before you log in */}
                <Link className="btn btn-outline-secondary navbar-btn" to="/login">Login</Link>
                <Link className="btn btn-outline-secondary navbar-btn" to="/signup">Sign Up</Link>
              </div>
          }
          {
            isAdmin
              ? <div>
                <Link className="btn btn-outline-secondary navbar-btn" to="/users">Users</Link>
              </div>
              :
              <div />
          }
        
        </div> {/* end container fluid*/}
      </nav>
    <hr />
    </div>
  )
}

/*
 * CONTAINER
*/
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin,
    userId: state.user.id,
    user: state.user,
    allProducts: state.products.allProducts
  }
}

// const mapDispatch = (dispatch) => {
//   return {
//     handleClick () {
//       dispatch(logout())
//     }
//   }
// }
const mapDispatch = dispatch => ({
  // onQtChange: (evt) => {},
  handleClick: () => dispatch(logout())
  // getCart: (userId) => {
  //   dispatch(fetchCart(userId))
  // }
})

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default connect(mapState, mapDispatch)(Navbar)

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
