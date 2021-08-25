import axios from 'axios';
import React, { Component } from 'react';

class LoginContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            email : '',
            password : ''
        };
        this.inputHandler = this.inputHandler.bind(this);
        this.loginRequestHandler = this.loginRequestHandler.bind(this);
    }

    inputHandler(e){
        this.setState({ [e.target.name] : e.target.value });
    }

    loginRequestHandler(){
        // TODO 서버에 로그인 요청
    }
    render(){
        return(
            <div className='login__box'>
                <div className='login__box__input'>
                    <input 
                        name='email'
                        className ='login__box__input__id' 
                        type="text" 
                        placeholder='E-mail' 
                        onChange={(e) => this.inputHandler(e)}
                        value={this.state.userId}
                        />
                    <input 
                        name='password'
                        className ='login__box__input__password' 
                        type="password" 
                        placeholder='password' 
                        onChange={(e) => this.inputHandler(e)}
                        value={this.state.password}
                        />
                </div>
                <div className='login__box__btn'>
                    <button 
                        className='login__box__btn__sign-in' 
                        onClick={this.loginRequestHandler}
                    >
                        Sign-In
                    </button>
                    <button 
                        className='login__box__btn__sign-up' 
                        type='button'
                    >
                        {/* 
                            TODO: Sign up page로 연결
                        */}
                        Sign-Up
                    </button>
                </div>
                <div className='login__box__social'>
                    <div className='login__box__social__text'>
                        sign in with github
                    </div>
                    <button 
                        className='login__box__social__btn' 
                        type='button'
                    >
                        {/* 
                            TODO: github 소셜로그인으로 연결
                        */}
                    </button>
                </div>
            </div>
        )
    }
}

export default LoginContainer