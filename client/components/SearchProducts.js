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
            <form className="navbar-form navbar-left" id="search">
                <div className="form-group">
                    <input type="text" className="form-control" onChange ={this.handleChange} placeholder="Search" params={{ products: this.props.products, searchInput: this.state.searchInput }} />
                </div>
                    <Link to={{pathname: '/search', state: { input: this.state.searchInput, products: this.props.products}}} title="Search">
                        <button className="btn btn-outline-secondary">
                            <i className="material-icons">search</i>
                        </button>
                    </Link>
            </form>
        )
    }
}