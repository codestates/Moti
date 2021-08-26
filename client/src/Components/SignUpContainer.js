import axios from 'axios';
import React, {useState} from 'react';

export default function SignUpContainer () {
    const [signupInfo, setSignupInfo] = useState({
        email:'',
        userName:'',
        password:'',
        passwordCheck:''
    })

    const [errorVisible, setErrorVisible] = useState({
        email:false,
        userName:false,
        password:false,
        passwordCheck:false
    })

    const handleInputValue = (key) => (e) => {
        setSignupInfo({ ...signupInfo, [key]:e.target.value})
        console.log(signupInfo)
    }

    const onSubmitHandler = (e) => {
        // 제출
    }

    return (
        <div className='signup__box'>
            <div className='signup__box__tittle'>
                sign up
            </div>
            <div className='signup__box__input'>
                <div className='signup__box__input__email'>
                    <input
                        name='email'
                        className ='signup__box__input__email__input' 
                        type="email" 
                        placeholder='E-mail' 
                        onChange={handleInputValue('email')}/
                    >
                    <img 
                        src="https://img.icons8.com/ios/24/000000/new-post.png"
                        className = 'signup__box__input__email__image'
                    />
                    <div className='signup__box__input__email__error error'>
                        5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.
                    </div>
                </div>
                <div className='signup__box__input__user-name'>
                    <input
                        name='userName'
                        className ='signup__box__input__user-name__input' 
                        type="text" 
                        placeholder='user name' 
                        onChange={handleInputValue('userName')}/
                    >
                    <img 
                        src="https://img.icons8.com/ios/24/000000/user--v1.png"
                        className='signup__box__input__user-name__image'
                    />
                    {/* 닉네임 조건.. */}
                </div>
                <div className='signup__box__input__password'>
                    <input
                        name='password'
                        className ='signup__box__input__password__input' 
                        type="password" 
                        placeholder='password' 
                        onChange={handleInputValue('password')}/
                    >
                    <img 
                        src="https://img.icons8.com/ios/50/000000/lock--v1.png"
                        className = 'signup__box__input__password__image'
                    />
                    <div className='signup__box__input__password__error error'>
                        8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.
                    </div>
                </div>
                <div className='signup__box__input__password-check'>
                    <input
                        name='passwordCheck'
                        className ='signup__box__input__password-check__input' 
                        type="password" 
                        placeholder='password check' 
                        onChange={handleInputValue('passwordCheck')}/
                    >
                    <img 
                        src="https://img.icons8.com/ios/50/000000/lock--v1.png"
                        className = 'signup__box__input__password-check__image'
                    />
                    <div className='signup__box__input__password-check__error error'>
                        비밀번호가 일치하지 않습니다.
                    </div>
                </div>
            </div>
            <button className='signup__box__btn'>
                sign up
            </button>
        </div>
    )
}