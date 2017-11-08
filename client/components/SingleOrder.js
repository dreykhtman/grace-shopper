import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchSingleOrder} from '../store';
import axios from 'axios';

export class SingleOrder extends Component {
  constructor() {
    super()
    this.state = {edit: false, placed: '', timePlaced: '', shippedDate: '', deliveryDate: ''};
    this.handleEdit = this.handleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount () {
    this.findId.bind(this);
    this.props.loadOrder(this.findId(), +this.props.userId)
  }

  findId() {
    const idxToSlice = this.props.location.pathname.lastIndexOf('/');
    return +this.props.location.pathname.slice(idxToSlice + 1);
  }

  handleEdit(e) {
    this.setState({edit: !this.state.edit})
  }
  handleChange(e) {
    const name = e.target.name;
    const val = e.target.value;
    this.setState({ [name]: val })
  }
  handleEditSubmit(e) {
    e.preventDefault();
    let state = this.state;
    let order = this.props.singleOrder;
    const editId = this.props.match.params.orderId;
    let timePlaced = state.timePlaced ? state.timePlaced : order.timePlaced
    let shippedDate = state.shippedDate ? state.shippedDate : order.shippedDate
    const orderToUpdate = Object.assign({}, {timePlaced, shippedDate});

    axios.put(`/api/users/${this.props.userId}/orders/${editId}`, orderToUpdate)
    .then(res => res.data)
    .then(updatedOrder => {
      window.location.reload();
    })
  }
  handleDelete(e) {
    const deleteId = this.props.match.params.orderId;
    axios.delete(`/api/users/${this.props.userId}/orders/${deleteId}`)
    .then(res => res.data)
    .then(() => { window.location.href = `/users/${this.props.user}/orders`; })
  }

  render () {
    const order = this.props.singleOrder;
    if (!order) return null;
    //Need to map through this for current price?
    const orderedProducts = order.products;
    //Render denied mssg if attempting to access wrong order
    if (typeof order === 'string') {return (<h3>'Permission denied, you can only view your own orders. For the security of our customers, you will be flagged upon requesting orders of other users.'</h3>)}
    //Need shipping info?
    if (!order.user) return null;
    const userOrdering = order.user;

    return (
      <div className="container">
        <h3>Order: {order.id} for User:&nbsp;
          <Link to={`/users/${order.userId}`}>{userOrdering.name}</Link>
        </h3>
        <div className="row">
        { !this.state.edit && order ? (
          ( <div className="col-md-4">
            <div className="thumbnail">
              <ul>
                <li> {`Placed: ${order.placed}`} </li>
                <li> Time Placed:
                  { order.timePlaced ?
                    (<ul>
                      <li>{`Date: ${order.timePlaced.slice(0, 10)}`}</li>
                      <li>{`Time: ${order.timePlaced.slice(11, 19)}`}</li>
                    </ul>) : ' null' }
                </li>
                <li> Ship Date:
                  { order.shippedDate ?
                    (<ul>
                      <li>{`Date: ${order.shippedDate.slice(0, 10)}`}</li>
                      <li>{`Time: ${order.shippedDate.slice(11, 19)}`}</li>
                    </ul>) : ' null' }
                </li>
              </ul>
              <button className="btn btn-warning" onClick={this.handleEdit}>Edit Order</button>
            </div>
          </div>)) : (
          <div className="col-md-4">
            <form className="thumbnail" onChange={this.handleChange} >
              <label>Time Placed:</label>
              <input type="text" name="timePlaced" placeholder={order.timePlaced ? `${order.timePlaced}` : 'null'} />
              <label>Ship Date:</label>
              <input type="text" name="shippedDate" placeholder={order.shippedDate ? `${order.shippedDate}` : 'null'} />
              <label>Delivery Date:</label>
              <input type="text" name="deliveryDate" placeholder={order.deliveryDate ? `${order.deliveryDate}` : 'null'} />
              <button type="submit" className="btn btn-warning" onClick={this.handleEditSubmit}>Submit Edit</button>
              <button className="btn btn-danger" onClick={this.handleDelete}disabled={order.placed}>Cancel Order</button>
            </form>
          </div>) }

          <div className="col-md-4">
            <ul>
              <li>User Id: {userOrdering.id}</li>
              <li>isAdmin: {`${userOrdering.isAdmin}`}</li>
              <li>Name: {userOrdering.name}</li>
              <li>Email: {userOrdering.email}</li>
              <li>GoogleId: {userOrdering.googleId}</li>
              <li>Address: {userOrdering.address}</li>
            </ul>
          </div>

          <div>
            <table style={{width: '50%'}} className="table table-hover table-bordered">
              <thead>
                <tr >
                  <th>Product ID: &nbsp;&nbsp;</th>
                  <th>Product Name: &nbsp;&nbsp;&nbsp;</th>
                  <th>Product Price: &nbsp;&nbsp;&nbsp;</th>
                  <th>Quantity: &nbsp;&nbsp;&nbsp;</th>
                  <th>Total Price: &nbsp;&nbsp;&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                { orderedProducts && orderedProducts.map(prod => (
                  <tr key={prod.id}>
                    <td>{prod.id}</td>
                    <td>{prod.name}</td>
                    <td>{prod.floatPrice}</td>
                    <td>{prod.products_in_order.quantity}</td>
                    <td className="total-price">{(prod.floatPrice * prod.products_in_order.quantity).toFixed(2)}</td>
                  </tr>
                )) }
              </tbody>
            </table>
          </div>
        </div>
      </div> )
  }
}

/*
 * CONTAINER
*/
const mapState = state => {
  return { singleOrder: state.orders.singleOrder, userId: state.user.id }
}

const mapDispatch = dispatch => ({ loadOrder: (ID, userId) => dispatch(fetchSingleOrder(ID, userId)) })

export default connect(mapState, mapDispatch)(SingleOrder)
