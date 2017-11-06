import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class SingleProduct extends Component {
  constructor() {
    super();
    this.state = {
      product: {},
      category: ''
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get(`/api/products/${id}`)
      .then(res => res.data)
      .then(product => {
        this.setState({
          product,
          category: product.category
        });
      });
  }

  render() {
    const product = this.state.product;
    const reviews = product.reviews;
    let stock = product.stock;
    let qtyArr = [...Array(stock)];

    return (
      <div className="container">
        <div className="row">
          <div className="card col">
            <h3 className="card-title">{product.name}</h3>
            <img className="card-img-top" src={product.imageUrl} />
            <div className="card-block">
              <h5 className="card-title">About the product</h5>
              <p className="card-text">{product.description}</p>
            </div>
          </div>
          <div className="card col">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Price: ${product.floatPrice}</li>
              <li className="list-group-item">Rating: {
                reviews && reviews.reduce((num, review) => {
                  num += review.rating
                  return num;
                }, 0) / reviews.length}
              </li>
              <li className="list-group-item">Reviews:
                <ul>
                  {
                    reviews && reviews.map(review => (
                      <li key={review.id}>{review.text}</li>
                    ))
                  }
                </ul>
              </li>
              <li className="list-group-item">Category: <Link to={`/products/category/${this.state.category}`}>{this.state.category}</Link></li>
            </ul>
            <form>
            <select>
              <option>Quantity:</option>
              { qtyArr.length ? qtyArr.length && qtyArr.map( (el, i) => (<option key={i}>{i + 1}</option>) )
              : <option>Out of Stock</option>}
            </select>
            </form>
            <div className="card-block">
              <button type="button" className="btn btn-secondary"><i className="material-icons">add_shopping_cart</i> Add to cart</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
