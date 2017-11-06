import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import Category from './Category';

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const { email } = props
  const allProds = props.products;

  let byCat = allProds.reduce((acc, curr) => {
    acc[curr.category] = acc[curr.category] ? acc[curr.category].push(curr) : [curr];
    return acc;
  }, {})
  let cats = Object.keys(byCat)

  return (
    <div>
      <div>
        <h3>Welcome, {email || 'Guest'}</h3>
      </div>
      {/* <div className="container"> */}
        <div className="row">
          {
            cats && cats.map((cat, i) => (
              <Category key={i} products={allProds} category={cat} />
            ))
          }
        </div>
      {/* </div> */}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email,
    products: state.products.allProducts
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}

    // <div>

    //   <div>
    //     <h3>Welcome, {email}</h3>
    //   </div>

    //   <div className="container just-cent">
    //     <div className="row">
    //     {
    //       cats.length && cats.map( (cat, i) => {
    //         return (<div key={i} className="col-md-4 cat">
    //           <Link to={`/products/category/${cat}`} ><h2>{cat}</h2></Link>
    //         </div>)
    //       })
    //     }
    //     </div>
    //   </div>

    // </div>
