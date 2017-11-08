import React from 'react';
import { Link } from 'react-router-dom';
import SingleProductCard from './SingleProductCard';

const Category = (props) => {
  const { products, category } = props;

  return (
    <div>
      <Link to={`/products/category/${category}`}><h3>{category}</h3></Link>
      {
        products && products.filter(product => {
          return product.category === category
        }).map(prod => (
          <div key={prod.id}>
            <SingleProductCard className="product-card" product={prod} />
          </div>
        ))
      }
    </div>
  )
}

export default Category;
