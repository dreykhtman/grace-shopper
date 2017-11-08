import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import { Contact } from './index';

export class AccountPage extends Component {
    constructor (props) {
        super(props)
        this.state = {
            orders: []
        }
    }
    componentDidMount () {
        axios.get(`/api/users/${this.props.user.id}/orders`)
            .then(res => {
                this.setState({ orders: res.data })
            })
            .catch(err => console.log(err))
    }

    render () {
        const user = this.props.user;
        const pastOrders = this.state.orders.filter(order => {
            return order.placed
        });
        console.log('past orders', pastOrders);
        return (
            <div>
                <h2>Account Info:</h2>
                    <h4>{`Name: ${user.name || 'no name provided'}`}</h4>
                    <h4>{`Email: ${user.email}`}</h4>
                    <h4>{`Mailing Address: ${user.address || 'no address provided'}`}</h4>
                    <h4>{`Credit Card: xxxx-xxxx-xxxx-${user.cc.slice(-4)}`}</h4>
                    <Link to={`/users/${user.id}`}>
                        <button className="btn btn-warning">Edit Account Info</button>
                    </Link>
                    <hr />
                <h2>Order History</h2>
                    <div className="orderHistory">
                    {
                        pastOrders.map(pastOrder => {
                            return (
                                <div key={pastOrder.id}>
                                    <h4>{`Placed on ${pastOrder.timePlaced.slice(0, 10)}`}</h4>
                                    {
                                        pastOrder.products.map(product => {
                                            return (
                                            <div key={product.id}>
                                                <h5><span>{`${product.products_in_order.quantity} - `}</span><span>{product.name}</span></h5>
                                            </div>
                                            )
                                        })
                                    }
                                    <h4>Subtotal: ${pastOrder.subtotal}</h4>
                                    {
                                        pastOrder.deliveryDate
                                        ? <div>
                                            <h5>{`Status: Delivered on ${pastOrder.deliveryDate.slice(0, 10)}`}</h5>
                                        </div>
                                        : <div>
                                        {
                                            pastOrder.shippedDate
                                            ? <div>
                                                <h5>{`Status: Shipping Date: ${pastOrder.shippedDate.slice(0, 10)}`}</h5>
                                            </div>
                                            : <div>
                                                <h5>{`Status: Your order is being processed.`}</h5>
                                            </div>
                                        }
                                        </div>

                                    }
                                </div>
                            )
                        })
                    }
                    </div>
                    <Link to="/contact">
                        <button className="btn btn-danger">Returns & Exchanges</button>
                    </Link>
            </div>
        )
    }
}

const mapState = (state) => {
    return {
      user: state.user
    }
  }

export default connect(mapState)(AccountPage);

