import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_USERS = 'GET_ALL_USERS';
const DELETE_USER = 'DELETE_USER';
// const UPDATE_USER = 'UPDATE_USER';
// const CHANGE_ADMIN_STATUS = 'CHANGE_ADMIN_STATUS';

/**
 * INITIAL STATE
 */
const initialState = {
  users: [],
  defaultUser: {}
}

/**
 * ACTION CREATORS
 */
const getAllUsers = users => ({type: GET_ALL_USERS, users});
const deleteUser = () => ({type: DELETE_USER});
// const editUser = () => ({type: REMOVE_USER});
// const editAdminStatus = () => ({type: REMOVE_USER});

/**
 * THUNK CREATORS
 */
export const fetchAllUsers = () =>
  dispatch =>
    axios.get('/api/users')
      .then(res => {
        dispatch(getAllUsers(res.data || initialState.users))
      })
      .catch(err => console.log(err))

export const removeUser = (userId) =>
    dispatch =>
      axios.delete(`/api/users/${userId}`)
      .then(() => {
        dispatch(deleteUser(userId));
      })
      .then(window.location.reload())
      .catch(err => console.log(err))

/**
 * REDUCER
 */

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users;
    case DELETE_USER:
      return state;
    default:
      return state;
  }
}
