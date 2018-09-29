import React, { Component } from 'react';

import './home.css';
import axios from 'axios';

class Home extends Component {

    state = {
        headerInput: '',
        pageInput: '',
        pictures: [],
        toggles: true
    }

    // componentDidMount(){

    // }

    onInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onEnterPress = (e) => {
        if (e.which === 13) {
            this.onSearchClick(this.state.pageInput || this.state.headerInput)
        }
    }

    onSearchClick = (input) => {
        axios.get(`https://api.flickr.com/services/feeds/photos_public.gne?tags=${input}&format=json&nojsoncallback=true`)
            .then((response) => {
                console.log(response)
                this.setState({ pictures: response.data.items, pageInput: '', headerInput: '', toggles: false })
            })
    }

    addToFav = (picture) => {
        axios.post(`http://localhost:8080/favorites/${this.props.match.params.id}`, {picture: picture})
        .then((response) => {
            console.log(response);
        })
    }

    render() {

        const pictures = this.state.pictures.map(picture => {
            return (
                <div className="picture-return">
                    <div>
                        <img src={picture.media.m}></img>
                        {/* <h6>{picture.title}</h6> */}
                        {this.props.match.params.id ? <button onClick = {() => this.addToFav(picture)}>Add to Favorites</button> : null}
                    </div>
                </div>
            )
        })

        const searchBar =
            <div className="search-section">
                <div className="search-bar">
                    <input placeholder="Search For Images" name="pageInput" value={this.state.pageInput} onChange={this.onInputChange} onKeyPress={this.onEnterPress} />
                    <button onClick={this.onSearchClick}>Search</button>
                </div>
            </div>

        return (
            <div className={this.state.toggles ? "main-background" : ""}>
                <div className="main-navigation">
                    <div className="logo"><a href="http://localhost:3000"/></div>
                    <input placeholder="Search" name="headerInput" value={this.state.headerInput} onChange={this.onInputChange} onKeyPress={this.onEnterPress} />
                    <div className="login-button">
                    {this.props.match.params.id ? 
                        <a href="http://localhost:3000">Logout</a>
                        :
                        <a href="http://localhost:3000/Login">Login</a>}
                    </div>
                    <div className="profile-button">
                    {this.props.match.params.id ? 
                        <a href={`http://localhost:3000/Profile/${this.props.match.params.id}`}>My Page</a>
                        :
                        <a href="http://localhost:3000/Login">My Page</a>}
                    </div>
                </div>

                <div className="picture-container">
                    {this.state.toggles ? searchBar : pictures}
                </div>




            </div>
        )
    }
}

export default Home;