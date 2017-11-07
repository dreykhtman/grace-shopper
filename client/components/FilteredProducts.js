import React from 'react';
import SingleProductCard from './SingleProductCard';

export const FilteredProducts = (props) => {
    const input = props.location.state.input;
    const products = props.location.state.products;
    const filteredProducts = products.filter(product => {
        const name = product.name.toLowerCase();
        const category = product.category.toLowerCase();
        const description = product.description.toLowerCase();        
        return name.includes(input) || description.includes(input) || category.includes(input);
    });
    return (
        <div>
            <h2>{`Results for '${input}'`}</h2>
            <div>
            {
                filteredProducts.map(product => {
                    return <SingleProductCard key={product.id} product={product} />
                })
            }
            </div>
        </div>
    )
}
