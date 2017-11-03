import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToCart, fetchOrder } from '../store/cart';
import store from '../store';


class CartFunc extends Component {
    
    constructor (props) {
        super(props);
        this.state = {
           
        }
        this.onQtChange = this.onQtChange.bind(this);
    }
    onQtChange (event) {
        this.setState({ quantity: event.target.value });
    }
    
    render () {
        console.log(this.state.quantity)
        const cart = this.props.cart.cart;
        return (
            <div>
            <h1>Your Shopping Cart</h1>
            <ul>
            {
                cart && cart.products.length && cart.products.map(product => {
                    return (
                    <div key={product.name}>
                        <li >
                            <span>Product Name: {product.name}</span>
                            <span>Price: {product.floatPrice}</span>
                        
                        <form className="cart-form">
                            <input type="text" qt="qt" placeholder={product.products_in_order.quantity} onChange={this.onQtChange} value={this.state.quantity} />
                        </form>
                        </li>
                    </div>
                    )
                })
            }
            </ul>
        </div>
        )
    }
    
}



const mapStateToProps = function (state) {
    return {
      cart: state.cart
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onQtChange (evt) {
           
        }
        
    }
}

export const Cart = connect(mapStateToProps, mapDispatchToProps)(CartFunc);

