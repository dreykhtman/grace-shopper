import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

export const AllProducts = (props) => {
    const prods = props.allProducts;
    const url = props.location.pathname;
    const idxChop = url.lastIndexOf('/');
    const cat = url.slice(idxChop + 1);
    const byCat = prods.filter(prod => prod.category === cat)

    return (
      <div className="container">
        <div className="row">
        {
          prods && byCat.map(product =>
            ( <div className="col-md-4" key={product.id}>
              <div className="thumbnail">
                <Link to={`/products/${product.id}`}>
                <h3>{product.name}</h3>
                <img src={product.imageUrl} />
                </Link>
              </div>
            </div>
            )
          )
        }
          {
            //Should we add a button to show all products...?
            // prods && prods.map(product => (
            //   <div className="col-md-4" key={product.id}>
            //     <div className="thumbnail">
            //       <Link to={`/products/${product.id}`}><img src={product.imageUrl} /></Link>

            //     </div>
            //   </div>
            // ))
          }
        </div>
      </div>
    )
}

/*
 * CONTAINER
*/
const mapState = state => {
  console.log('in allProdCont!', 'state:', state)
  return {
    allProducts: state.products.allProducts
  }
}

export default connect(mapState)(AllProducts)
//AllProducts.propTypes = {}
