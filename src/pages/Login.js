import React, { Component } from 'react';
import './Login.css'
import twitterLogo from '../twitter.svg'


export default class Login extends Component {

    state={
        username: ''
    }
    handleSubmit = e =>{
        e.preventDefault();

        const{username} = this.state
        if(!username.length) return

        localStorage.setItem('@Twitter:username',username)

        this.props.history.push('/timeline')
    }

    handleInputChange= e =>{
        this.setState({ username: e.target.value });
        console.log(this.username)
    }

    render() {
        return (
            <div className='login-wrapper'>
                <img src={twitterLogo} alt="MedinaTwittwe" />
                <form onSubmit={this.handleSubmit}>
                    <input
                     value={this.state.username}
                     onChange={this.handleInputChange}
                     placeholder="Nome de usuario" />
                    <button type="submit">Entrar</button>
                </form>
            </div>
        )
    }
}
