import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import axios from 'axios';

const Header = (props) => {
    return <div className="home-header">
     <div>Welcome {props.user.firstName}!</div> 
        <Link to='/login'><h5>Log Out</h5></Link>
        <Link to={'/logged-in/user/' + props.id}><h5>Return to Home Page</h5></Link>
     </div>
}

export function findById (id){
    return axios.get(`http://localhost:8080/userService/${id}`)
    .then((response) => {
        const user = response.data;
        return user;
    })
}



class Profile extends Component {
    state = {
        user: {},
        favPics: []
    }

    

    componentDidMount() {
        console.log(this.props)
        const id = this.props.match.params.id;
        findById(id)
        .then((user) => {
            this.setState({ user })
    })
    .catch((error) => {
        console.error(error)
    })
}

showMyFav = () => {
        axios.get(`http://localhost:8080/userService/${this.props.match.params.id}`)
        .then((response) => {
            console.log(response.data.fav)
            
        })
    }

    render() {
        if (!this.state.user.id) return <div>Loading...</div>


        return(
            <div>
                <Header user = {this.state.user} history={this.props.history} id={this.props.match.params.id}/>
                <div className="home-body">
                    <div className="side-bar"></div>
                    <div className="main-content"></div>
                </div>
                <button onClick = { this.showMyFav }>Show my Favorite Pictures</button>
            </div>
        )
    }
}

export default Profile;