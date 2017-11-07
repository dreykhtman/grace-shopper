import React, { Component } from 'react';
import axios from 'axios';

export default class EditProductForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
                name: '',
                category: '',
                price: '',
                stock: '',
        }
        this.handleSumbit = this.handleSumbit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount () {
        // axios.get(`/api/users/${this.props.match.params.userId}`)
        // .then(res => {
        //     this.setState(res.data)
        // })
    }

    handleChange (event) {
        // const name = event.target.name;
        // const value = event.target.value;
        // this.setState({ [name]: value });
    }

    // handleNameChange(event) {
    //     this.setState({ user: { name: event.target.value }});
    // }
    // handleEmailChange(event) {
    //     this.setState({ user: { email: event.target.value }});
    // }
    // handleAdminChange(event) {
    //     this.setState({ user: { isAdmin: event.target.value }});
    // }
    // handleAddressChange(event) {
    //     this.setState({ user: { address: event.target.value }});
    // }
    // handleCreditChange(event) {
    //     this.setState({ user: { cc: event.target.value }});
    // }


    handleSumbit(event) {
        // console.log('submit clicked')
        // const user = this.state;
        // axios.put(`/api/users/${this.props.match.params.userId}`, user)
        // .then(res => {
        //     console.log('updated user info:', res.data)
        // })
    }

    render() {
        return (
            <h1>please clap</h1>
        )
        // console.log('this.state:', this.state)
        // return (
        //     <form onSubmit={this.handleSumbit} onChange={this.handleChange}>
        //         <label>Update User Name:
        //             <input className="form-control" type="text" name="name" placeholder={this.state.name} />
        //         </label>
        //         <label>Update User Email:
        //             <input className="form-control" type="text" name="email" placeholder={this.state.email} />
        //         </label>
        //         <label>Update User Address:
        //             <input className="form-control" type="text" name="address" placeholder={this.state.address} />
        //         </label>
        //         <label>Update User Credit Card Number:
        //             <input className="form-control" type="text" name="cc" placeholder="xxxx-xxxx-xxxx-xxxx" />
        //         </label>
        //         <label>Update Admin Status:
        //             <select name="isAdmin">
        //                 <option value="false">user</option>
        //                 <option value="true">admin</option>
        //             </select>
        //         </label>
        //         <input className="btn btn-info" type="submit" value="Save Changes" />
        //     </form>
        // )
    }
}
