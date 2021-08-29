import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Buffer from 'buffer'

const serverurl = 'http://localhost:80'; // 배포환경시 수정필요
const GITHUB_LOGIN_URL = `https://github.com/login/oauth/authorize?client_id=0eda0c23f9078b24bbe1`;
//배포환경에서 실행한다면 github 콜백주소 변경해줘야함
// 소셜로그인 기능 확인 후 일단 mypage로 콜백

export default function LoginContainer ({ loginHandler, userInfo }) {

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
        if(!!(loginInfo.email) && !!(loginInfo.password)){
            setSomethingMissed(false)
            console.log('login request')
            axios
                .post(serverurl+'/user/login', {
                    adviceID: randomNum,
                    email:loginInfo.email,
                    password:loginInfo.password
                })
                .then( res => {
                    console.log(res)
                    let accessToken = res.data.data.accessToken;
                    let advice = res.data.data.RandomAdvice;
                    let username = res.data.data.username;
                    // let profile = res.data.data.profile
                    // let profile = new Buffer(res.data.data.profile.data,"base64")
                    // let text = profile.toString("ascii");
                    // let profile = Blob.arrayBuffer(res.data.data.profile.data)
                    // console.log(text)
                    
                    console.log(profile)

                    // loginHandler(accessToken, advice, username, profile);
                    // document.location.href='/mypage'
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
        window.location.assign(GITHUB_LOGIN_URL);
    }

    const getAccessToken = async (authorizationCode) =>{
        const url = serverurl+'/oauthgit';
        let resp = await axios.post(url, { authorizationCode: authorizationCode })
        console.log('이건 언제뜸 getaccesstoken')
        console.log(resp);
    }

    useEffect(()=>{
        const url = new URL(window.location.href);
        const authorizationCode = url.searchParams.get('code');
        if (authorizationCode) {
            console.log('소셜로그인')
            console.log(authorizationCode);
            //! authorizationCode, username, profile userInfo에 저장.
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