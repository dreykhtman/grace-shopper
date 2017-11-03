import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
//import PropTypes from 'prop-types';
//import axios from 'axios';
//import {fetchProducts} from '../store';
//import store from '../store';

// export class AllProducts extends React.Component {
//   constructor(p) {
//     super();
//     // this.state = {products: []};
//     // this.fetchProducts = this.fetchProducts.bind(this);
//   }
export const AllProducts = (props) => {
  // componentDidMount() {
  //   this.fetchProducts()
  // }
  //render() {
    const prods = props.allProducts;
    return (
      <div className="container">
        <div className="row">
          {
            prods && prods.map(product => (
              <div className="col-md-4" key={product.id}>
                <div className="thumbnail">
                  <Link to={`/products/${product.id}`}><img src={product.imageUrl} /></Link>

                </div>
              </div>
            ))
          }
        </div>
      </div>
    )
  //}
}

/*
 * CONTAINER
*/
const mapState = (state) => {
  console.log('in allProdCont!', 'state:', state)
  return {
    allProducts: state.products.allProducts
  }
}
// const mapDispatch = dispatch => ({
//   //return {
//     // getProds: () => {
//     //   dispatch(fetchProducts())
//     // }
//   //}
// })

export default connect(mapState)(AllProducts)

//AllProducts.propTypes = {}
