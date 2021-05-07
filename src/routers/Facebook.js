import React, { Component } from 'react';
import FacebookLogin from "react-facebook-login";

class Facebook extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false,
            userID: '',
            name: '',
            picture: ''
        }

        this.loginClicked = () => {
            console.log('clicked');
        };

        this.logoutClicked = () => {
            this.setState({
                isLoggedIn: false,
                userID: '',
                name: '',
                picture: ''
            })
        }

        this.responseFacebook = res => {
            console.log(res)
            this.setState({
                isLoggedIn: true,
                userID: res.userID,
                name: res.name,
                picture: res.picture.data.url
            })
        };
    }

    render() {
        let fbContent;

        if (this.state.isLoggedIn) {
            fbContent = (
                <>
                    <div>
                        <img src={this.state.picture} />
                        <h2>Welcom{this.state.name}</h2>
                    </div>
                    <button onClick={this.logoutClicked}>logout</button>
                </>
            )
        } else {
            fbContent = (
                <FacebookLogin
                    appId="2700919470224763"
                    autoLoad={true}
                    fields="name,email,picture"
                    onClick={this.loginClicked}
                    callback={this.responseFacebook} />)
        }

        return (
            <div>{fbContent}</div>
        )
    }

};
export default Facebook;
