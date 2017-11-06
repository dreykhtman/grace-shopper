import React from 'react';
import { Link } from 'react-router-dom';

const SingleProductCard = (props) => {
  const { product } = props;

  return (
    <div id="singleproduct" className="card">
      <div className="card-block">
        <Link to={`/products/${product.id}`} ><h4 className="card-title">{product.name}
        </h4></Link>
        <p className="card-text">{product.desctiption}</p>
        <Link to={`/products/${product.id}`} ><img className="card-img-top" src={product.imageUrl} /></Link>
      </div>
      <button id="viewbtn" type="button" className="btn btn-warning">
        <Link to={`/products/${product.id}`}>View</Link>
      </button>
    </div>
  )
}

export default SingleProductCard;
