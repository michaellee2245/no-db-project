import React, { Component } from 'react';

import './login.css';
import axios from 'axios';

function authenticateUser(email, password){
    console.log(email, password);
    return axios.get(`http://localhost:8080/authenticate-user?email=${email}&password=${password}`)
    .then((response) => {
        const userId = response.data.id;
        return userId;
    })
}

class Login extends Component {
    state = {
        email: '',
        password: ''
    }
    componentDidMount(){
        axios.get('http://localhost:8080/health')
        .then((response) => {
            console.log(response.data);
        })
        .catch(error => console.error(error))
    }

    handleChange = (event) => {
        const key = event.target.name;
        const value = event.target.value;

        this.setState({[key]: value })
    }

    handleClick = () => {

        authenticateUser(this.state.email, this.state.password)
        .then((userId) => {
            return this.props.history.push(`/Profile/${userId}`)
        })
        .catch((error) => {
            alert(`not authenticated: ${error}`)
        })
    }

    render() {
        return (
            <div className="login-container">
            
                <div className="login-wrapper">
                    <div className="login-logo"></div>
                    <input name="email" placeholder="Email" onChange={this.handleChange}/>
                    <input name="password" placeholder="Password" type="password" onChange={this.handleChange}  />
                    <div className="login-submit" onClick={this.handleClick}><button>Sign In</button></div>
                </div>
            </div>
        )
    }
}

export default Login;