import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class SearchProducts extends Component {
    constructor (props) {
        super(props);
        this.state = {
            searchInput: ''
        }
    } 
    render () {
        console.log('search props', this.props)
        return (
            <form id="search">
              <input type="text" placeholder="Search" params={{ products: this.props.products, searchInput: this.state.searchInput }} />
              <Link to="/search" title="Search">
                <button>
                  <i className="material-icons">search</i>
                </button>
              </Link>
            </form>
        )
    }
}