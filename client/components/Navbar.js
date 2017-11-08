import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../store';


export const Navbar = (props) => {
  const { handleClick, isLoggedIn, isAdmin } = props;

  return (
    <div>
    <header >
      <nav>
        <div>
          <Link to="/" title="Home">
            <img id="logo" src="https://ultros.io/static/images/fanart/rakiru_1.png" alt="Store logo" height="100em" width="auto" />
          </Link>
        </div>
        <div id="nav-features">
          <div>
            <form id="search">
              <input type="text" placeholder="Search" />
              <Link to="/search" title="Search">
                <button>
                  <i className="material-icons">search</i>
                </button>
              </Link>
            </form>
          </div>
          <div>
            <Link to={`/users/${props.userId}/cart`} title="Cart">
            <button id="cart">
              <i className="material-icons">shopping_cart</i>
            </button>
            </Link>
          </div>
          {
            isLoggedIn
              ? <div>
                {/* The navbar will show these links after you log in
                Have to add account button when logged in as well*/}
                <a href="#" onClick={handleClick}>Logout</a>
              </div>
              : <div>
                {/* The navbar will show these links before you log in */}
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
              </div>
          }
          {
            isAdmin
              ? <div>
                <Link to="/users">Users</Link>
              </div>
              :
              <div />
          }
        </div>
      </nav>
    </header>
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
    user: state.user
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
