import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeUser } from '../store/admin';
import SingleProductCard from './SingleProductCard';

export class AdminProductPage extends Component {
  constructor(props){
    super(props);  
  }

  render () {
    const products = this.props.products;
    console.log('all admin product props', this.props);  
  return (
    <div>
        <h1>All Products</h1>
      {

        products && products.map(product => {
          return (
            <div>
                <SingleProductCard key={product.id} product={product} />
                <Link to={{pathname: `/product/${product.id}/edit`, state: { product: product}}} title="Search">
                    <button className="btn btn-warning">Edit Product</button>
                </Link>
                
            </div>
          )
        })
      }
    </div>
  )
}
}

const mapState = (state) => {
    return {
      products: state.products.allProducts
    }
}

// const mapDispatch = (dispatch) => {
//   return {
//       deleteUser (userId, ev) {
//         dispatch(removeUser(userId));
//       }

//   }
// }

export default connect(mapState)(AdminProductPage);
