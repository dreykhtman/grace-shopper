import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class SearchProducts extends Component {
    constructor (props) {
        super(props);
        this.state = {
            searchInput: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({ searchInput: event.target.value })
    }
    render () {
        return (
            <form id="search">
              <input type="text" onChange ={this.handleChange} placeholder="Search" params={{ products: this.props.products, searchInput: this.state.searchInput }} />
              <Link to={{pathname: '/search', state: { input: this.state.searchInput, products: this.props.products}}} title="Search">
                <button>
                  <i className="material-icons">search</i>
                </button>
              </Link>
            </form>
        )
    }
}