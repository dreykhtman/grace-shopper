import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';

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
                            let products = pastOrder.products;
                            return (
                                <div key={pastOrder.id}>
                                    <h4>{`Placed on ${pastOrder.timePlaced.slice(0, 10)}`}</h4>
                                    {
                                    products.map(product => {
                                        return (
                                            <h5 key={product.id}>{product.name}</h5>
                                        )
                                    })
                                    }
                                </div>
                            )
                        })
                    }
                    </div>

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

