import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import history from '../history';

export class EditUserForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
                name: '',
                email: '',
                cc: '',
                address: '',
                isAdmin: false, 
                id: ''
        }
        this.handleSumbit = this.handleSumbit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount () {
        axios.get(`/api/users/${this.props.match.params.userId}`)
        .then(res => {
            this.setState(res.data)
        })
    }

    handleChange (event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value });
    }

    handleSumbit(event) {
        const user = this.state;
        axios.put(`/api/users/${this.props.match.params.userId}`, user)
    }

    render() {
        const user = this.props.user;
        const isAllowed = user.isAdmin || (user.id === this.state.id);
        return (
            <div>
            {
            isAllowed ?
            <div>
                <form onSubmit={this.handleSumbit} onChange={this.handleChange}>
                    <label>Update User Name:
                        <input className="form-control" type="text" name="name" placeholder={this.state.name} />
                    </label>
                    <label>Update User Email:
                        <input className="form-control" type="text" name="email" placeholder={this.state.email} />
                    </label>
                    <label>Update User Address:
                        <input className="form-control" type="text" name="address" placeholder={this.state.address} />
                    </label>
                    <label>Update User Credit Card Number:
                        <input className="form-control" type="text" name="cc" placeholder="xxxx-xxxx-xxxx-xxxx" />
                    </label>
                    <label>Update Admin Status:
                        <select name="isAdmin">
                            <option value="false">user</option>
                            <option value="true">admin</option>
                        </select>
                    </label>
                    <input className="btn btn-info" type="submit" value="Save Changes" />
                </form>
            </div>
            : <div>
                <h1>Access Denied</h1>
            </div>
            }
            </div>
        ) // end return
    } // end render
} // end component

const mapState = (state) => {
    return {
      user: state.user
    }
  }

export default connect(mapState)(EditUserForm);
