import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const serverurl = 'http://localhost:80'; // 배포환경시 수정필요

export default function LoginContainer () {
    const GITHUB_LOGIN_URL = `https://github.com/login/oauth/authorize?client_id=0eda0c23f9078b24bbe1`;
    //배포환경에서 실행한다면 github 콜백주소 변경해줘야함
    
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });

    const [somethingMissed, setSomethingMissed] = useState(false);
    const [errorVisible, setErrorVisible] = useState(false)

    const handleInputValue = (key) => (e) => {
        setLoginInfo({ ...loginInfo, [key]:e.target.value})
    }

    const loginRequestHandler = () => {
        let randomNum = Math.floor(Math.random()*10);
        if(loginInfo.email && loginInfo.password){
            setSomethingMissed(false)
            axios
                .post(serverurl+'/user/login', {
                    adviceID: randomNum,
                    email:loginInfo.email,
                    password:loginInfo.password
                })
                .then( res => {
                    console.log(res)
                    // document.location.href='/mypage'
                    // 로그인 성공 후 res오면 정보 app.js에 올려보낼 것.
                    
                })
                .catch( err => {
                    console.log('err')
                    setErrorVisible(true)
                })
        }else{
            setSomethingMissed(true)
        }
    }

    const socialLoginHandler = () =>{
        //!소셜로그인 성공하면 authorizationCode 저장하고 mypage로 이동해야함
        window.location.assign(GITHUB_LOGIN_URL);
    }

    const getAccessToken = async (authorizationCode) =>{
        const url = serverurl+'/oauthgit';
        let resp = await axios.post(url, { authorizationCode: authorizationCode })
        console.log(resp);
    }

    useEffect(()=>{
        const url = new URL(window.location.href);
        const authorizationCode = url.searchParams.get('code');
        if (authorizationCode) {
            console.log(authorizationCode);
            getAccessToken(authorizationCode)
        };
    })

    return(
        <div className='login__box'>
            <div className='login__box__input'>
                <div className='login__box__input__id'>
                    <input 
                        name='email'
                        className ='login__box__input__id__input' 
                        type="email" 
                        placeholder='E-mail' 
                        onChange={handleInputValue('email')}
                        />
                    <img 
                        src="https://img.icons8.com/ios/24/000000/new-post.png"
                        alt='email'
                        className = 'login__box__input__id__image'
                    />
                </div>
                <div className='login__box__input__password'>
                    <input 
                        name='password'
                        className ='login__box__input__password__input' 
                        type="password" 
                        placeholder='password' 
                        onChange={handleInputValue('password')}
                        />
                    <img 
                        src="https://img.icons8.com/ios/50/000000/lock--v1.png"
                        alt="password"
                        className = 'login__box__input__password__image'
                    />
                </div>

            </div>
            <div className='login__box__btn'>
                <button 
                    className= 'login__box__btn__sign-in'
                    onClick={loginRequestHandler}
                >
                    Sign-In
                </button>
                <Link to='/signup'>
                    <button className='login__box__btn__sign-up' onClick={loginRequestHandler}>Sign-Up</button>
                </Link>
            </div>
            <div className={errorVisible? 'login__box__error error' : 'login__box__error error hide'}>
                아이디 또는 비밀번호가 잘못 입력 되었습니다.
            </div>
            <div className={somethingMissed? 'login__box__error error' : 'login__box__error error hide'}>
                모든 항목을 입력해주세요.
            </div>
            <div className='login__box__social'>
                <div className='login__box__social__text'>
                    sign in with github
                </div>
                <button 
                    onClick={socialLoginHandler}
                    className='login__box__social__btn' 
                >
                    <img src="https://img.icons8.com/ios-glyphs/30/000000/github.png" alt='github'></img>
                </button>
            </div>
        </div>
    )
}