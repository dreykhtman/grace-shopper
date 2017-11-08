import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';


export class Cart extends Component {

  constructor() {
    super();
    // this.state = {
    //   cart: []
    // }
    this.onQtChange = this.onQtChange.bind(this);
  }

  onQtChange(event) {
    this.setState({ quantity: event.target.value });
  }

  render() {
    const cart = this.props.cart;
    if (!cart) return null;
    const orders = cart.orders;
    if (!orders) return null;
    const cartReady = orders[0].products;

    console.log('PROPS:', this.props, 'CART:', cart, 'cartReady:', cartReady)
    return (
      <div>
        <h1>Your Shopping Cart</h1>
        <ul>
          {
            cartReady && cartReady.map(product => {
              return (
                <div key={product.name}>
                  <li >
                    <span>Product Name: {product.name}</span>
                    <span>Price: {product.floatPrice}</span>

                    <div className="flex">
                      <span>Quantity:&nbsp;&nbsp;&nbsp;</span>
                      <form className="cart-form">
                        {//<input type="text" qt="qt"
                          //placeholder={product.products_in_order.quantity} //onChange={this.onQtChange}
                          //value={this.state.quantity}
                          ///>
                        }
                        <select onChange={this.onQtChange}>
                          <option>{product.products_in_order.quantity}</option>
                          {cart && [...Array(product.stock)].map((el, i) => (
                            <option key={i}>{i + 1}</option>))}
                        </select>
                      </form>
                    </div>

                  </li>
                </div>
              )
            })
          }
          <div style={{marginTop: '33px'}}>
            <form>
              <label>Promotion Code:</label>
              <input type="text" placeholder="Enter Code Here" />
              <Link to={`/users/${this.props.userId}/orderConfirmation`}>
                <button type="submit" className="btn btn-success" >Checkout</button>
              </Link>
            </form>
          </div>
        </ul>
      </div>
    )
  }

}

const mapStateToProps = function (state) {
  return {
    cart: state.orders.cart,
    userId: state.user.id
  };
};

export default connect(mapStateToProps)(Cart);
