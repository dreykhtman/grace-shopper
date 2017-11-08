import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { removeUser } from '../store/admin';

export class AllUsers extends Component {
  constructor(props){
    super(props);  
  }

  render () {
    const users = this.props.users;
    //console.log('all user props', this.props);  
  return (
    <div>
      {
        users && users.length && users.map(user => {
          return (
            <div key={user.id}>
              <h2>{user.email}</h2>
              <Link to={`/users/${user.id}`}>
                <button className="btn btn-warning">Edit</button>
              </Link>
              <button className="btn btn-danger" onClick={(ev) => this.props.deleteUser(user.id, ev)}>Delete</button>
            </div>
          )
        })
      }
    </div>
  )
}
}

const mapState = (state) => {
    return {
      users: state.admin
    }
}

const mapDispatch = (dispatch) => {
  return {
      deleteUser (userId, ev) {
        dispatch(removeUser(userId));
      }

  }
}

export default connect(mapState, mapDispatch)(AllUsers);
