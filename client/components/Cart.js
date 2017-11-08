import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchCart} from '../store'
import axios from 'axios';


export class Cart extends Component {
  constructor() {
    super();
    this.state = {
      order: {},
      promo: ''
    }
    this.onQtChange = this.onQtChange.bind(this);
    this.calcSubtotal = this.calcSubtotal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckout = this.handleCheckout.bind(this);
    this.promo = this.promo.bind(this);
  }

  componentDidMount() {
    this.props.getCart(this.props.userId);
  }

  componentWillReceiveProps(nextProps) {
    const order = nextProps.cart;
    this.setState({ order });
  }

  calcSubtotal() {
    let order = this.state.order;
    let pCode = this.state.promo;
    if (!order.products) return null;
    let products = order.products;

    let total = products.reduce( (acc, product) => {
      let price = +product.floatPrice;
      let qty = this.state[product.name] ? +this.state[product.name] : product.products_in_order.quantity;
        acc += (price * qty)
        return acc;
      }, 0).toFixed(2);
    return pCode === 'COREYSBDAY' ? (total / 2).toFixed(2) : total;
  }

  promo(e) {
    let pCode = e.target.value;
    this.setState({promo: pCode});
    if (pCode === 'COREYSBDAY') {
      alert('50% discount! For real!');
    }
  }

  onQtChange(event) {
    let name = event.target.name;
    let qty = event.target.value;
    let order = this.state.order;
    if (!order.products) return null;
    let products = order.products;
    let productId = products.reduce( (acc, curr) => {
      if (name === curr.name) acc = curr.id;
      return acc;
    })
    this.handleChange(productId, qty);
    this.setState({ [name]: qty} );
  }

  handleChange(prodId, qty) {
    let userId = this.props.userId;
    let toUpdate = {
      quantity: +qty,
      productId: +prodId,
      orderId: this.state.order.id
    }
    axios.put(`/api/products/${prodId}/cart`, toUpdate)
    .then(res => res.data)
    .then(() => { window.location.href = `/users/${userId}/cart`; })
  }

  handleCheckout(e) {
    e.preventDefault();
    const order = this.state.order;
    const orderId = order.id;

    let placed = !order.placed ? true : false;
    const timePlaced = Date.now();
    const shipDate = new Date;
    const daysTillShip = 3;
    const shippedDate = shipDate.setDate(shipDate.getDate() + daysTillShip);
    let subtotal = this.calcSubtotal();

    const orderToUpdate = Object.assign({}, {placed, timePlaced, shippedDate, subtotal});
    console.log('handling checkout, orderToUpdate:', orderToUpdate);

    axios.put(`/api/users/${this.props.userId}/orders/${orderId}`, orderToUpdate)
    .then(res => res.data)
    .then( () => { window.location.href = `/users/${this.props.userId}/orderConfirmation`; } )
  }

  render() {
    const order = this.state.order;
    if (typeof order === 'string') return 'Please place an order.'
    if (!order.products) return null;
    const cartReady = order.products;
    let total = this.calcSubtotal();

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
                    <br />
                    <span>Price: {product.floatPrice}</span>

                    <div className="flex">
                      <span>Quantity:&nbsp;&nbsp;&nbsp;</span>
                      <form className="cart-form" onChange={this.onQtChange}>
                        <select name={product.name}>
                          <option value={product.products_in_order.quantity}>{product.products_in_order.quantity}</option>
                          {cartReady && [...Array(product.stock)].map((el, i) => (
                            <option key={i}>{i + 1}</option>))}
                        </select>
                      </form>
                    </div>

                  </li>
                </div>
              )
            })
        }
        <br />
        <div>
        <h4>Subtotal:</h4><span>{ total }</span>
        </div>
        </ul>

        <div style={{marginTop: '33px'}}>
          <form onSubmit={this.handleCheckout}>
            <label>Promotion Code:</label>
            <input type="text" placeholder="Enter Code Here" onChange={this.promo} />
            <label>Credit Card:</label>
            <input type="text" placeholder="Enter Credit Card Here" />
            <label>CVM:</label>
            <input type="text" placeholder="Enter CVM Here" />
            <br />
            <button type="submit" className="btn btn-success" >Checkout</button>
          </form>
        </div>

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

const mapDispatch = dispatch => ({
  getCart: (userId) => dispatch(fetchCart(userId))
})

export default connect(mapStateToProps, mapDispatch)(Cart);
