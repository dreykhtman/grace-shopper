import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchOrders} from '../store';

export class Orders extends Component {
  componentDidMount () {
    this.props.loadData(+this.props.userId)
  }

  render () {
    const orders = this.props.allOrders;

    return (
      <div className="container">
        <div className="row">
          { orders && orders.map(order => (
          <div className="col-md-3" key={order.id}>
            <div className="thumbnail">
              <Link to={`/users/${this.props.userId}/orders/${order.id}`}>
                <h4> Order Id: {order.id} </h4>
              </Link>
              <ul>
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
              </ul>
            </div>
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
  return { allOrders: state.orders.allOrders, userId: state.user.id }
}

const mapDispatch = dispatch => ({ loadData: (id) => dispatch(fetchOrders(id)) })

export default connect(mapState, mapDispatch)(Orders)
//Orders.propTypes = {}
