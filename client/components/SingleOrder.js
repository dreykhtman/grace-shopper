import React, {Component} from 'react'
//import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchSingleOrder} from '../store';

export class SingleOrder extends Component {
  componentDidMount () {
    this.findId.bind(this);
    this.props.loadOrder(this.findId())
  }

  findId() {
    const idxToSlice = this.props.location.pathname.lastIndexOf('/');
    return +this.props.location.pathname.slice(idxToSlice + 1);
  }

  render () {
    const order = this.props.singleOrder;
    if (!order) return null;
    //Need to map through this for current price?
    const orderedProducts = order.products;
    console.log('order:', order)
    //Render denied mssg if attempting to access wrong order
    if (typeof order === 'string') {return (<h3>'Permission denied, you can only view your own orders. For the security of our customers, you will be flagged upon requesting orders of other users.'</h3>)}
    //Need shipping info?
    if (!order.user) return null;
    const userOrdering = order.user;
    return ( <div className="container">
        <div className="row">
          { order && (<div className="col-md-4">
            <div className="thumbnail">
              <ul>
                <li> Order Id: {order.id} </li>
                <li> User Id: {order.userId} </li>
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
                <li> Delivery Date:
                  { order.deliveryDate ?
                  (<ul>
                    <li>{`Date: ${order.deliveryDate.slice(0, 10)}`}</li>
                    <li>{`Time: ${order.deliveryDate.slice(11, 19)}`}</li>
                  </ul>) : ' null' }
                </li>
              </ul>
            </div>
          </div> ) }
          <div className="col-md-4">
            <ul>
              <li>User Id: {userOrdering.id}</li>
              <li>isAdmin: {userOrdering.isAdmin}</li>
              <li>Name: {userOrdering.name}</li>
              <li>Email: {userOrdering.email}</li>
              <li>GoogleId: {userOrdering.googleId}</li>
              <li>Address: {userOrdering.address}</li>
            </ul>
          </div>
          <div>
            <table style={{width: '50%'}}>
            <thead>
            <tr>
              <th>Product ID: &nbsp;&nbsp;&nbsp;</th>
              <th>Product Name: &nbsp;&nbsp;&nbsp;</th>
              <th>Product Price: &nbsp;&nbsp;&nbsp;</th>
              <th>Quantity: &nbsp;&nbsp;&nbsp;</th>
              <th>Total Price: &nbsp;&nbsp;&nbsp;</th>
            </tr>
            </thead>
            <tbody>
            {
              orderedProducts && orderedProducts.map(prod => (
                <tr key={prod.id}>
                  <td>{prod.id}</td>
                  <td>{prod.name}</td>
                  <td>{prod.floatPrice}</td>
                  <td>{prod.products_in_order.quantity}</td>
                  <td>{'Need fnc for total$/prod!'}</td>
                </tr>
              ))
            }
            <tr>
              <td>{''}</td>
              <td></td>
              <td></td>
              <td></td>
              <td>{'Need fnc for total$ of order!'}</td>
            </tr>
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
  return { singleOrder: state.orders.singleOrder }
}

const mapDispatch = dispatch => ({ loadOrder: (ID) => dispatch(fetchSingleOrder(ID)) })

export default connect(mapState, mapDispatch)(SingleOrder)
//export default connect(mapState)(SingleOrder)
