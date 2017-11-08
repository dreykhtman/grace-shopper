import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../store';


export const Footer = (props) => {
  const {isLoggedIn} = props
  return (
    <footer className="footer">
    <hr />
      <div id="footer-btns">
        { isLoggedIn ? <div id="order-btn">
            {/* The footer will show these links after you log in
            Have to add account button when logged in as well*/}
            <Link to={`/users/${props.userId}/orders`}>Orders</Link>
          </div> : null }
        {/* The footer will show these links before you log in */}
        <div id="help-btn">
          <Link to="/help">Help</Link>
        </div>
        <div id="about-btn">
          <Link to="/about">About</Link>
        </div>
        <div id="contact-btn">
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </footer>
  )
}

/*
 * CONTAINER
*/
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    userId: state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default connect(mapState, mapDispatch)(Footer)

Footer.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
}
