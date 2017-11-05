import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchOrders} from '../store';

export class Orders extends Component {
  componentDidMount () {
    this.props.loadData()
  }

  render () {
    const orders = this.props.allOrders;

    return (
      <div className="container">
        <div className="row">
          { orders && orders.map(order => (
            <div className="col-md-3" key={order.id}>
                <Link to={`/orders/${order.id}`}>
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
                </Link>
            </div>
          )) }
        </div>
      </div>
    )
  }
}

/*
 * CONTAINER
*/
const mapState = state => {
  return { allOrders: state.orders.allOrders }
}

const mapDispatch = dispatch => ({ loadData: () => dispatch(fetchOrders()) })

export default connect(mapState, mapDispatch)(Orders)
//Orders.propTypes = {}
