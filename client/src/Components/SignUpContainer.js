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
        passwordCheck:false,
        somethingMissed:false
    })

    const handleInputValue = (key) => (e) => {
        setSignupInfo({ ...signupInfo, [key]:e.target.value})
    }

    const validationCheck = (key) => (e) => {
        let value = e.target.value;
        console.log(key)
        console.log(value)
        let regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
        let regPassword = /^[a-zA-Z0-9]{8,20}$/
        if(key==='email'){
            if(regEmail.test(value)){
                setErrorVisible({...errorVisible, [key]:false})
                return true;
            }else{
                setErrorVisible({...errorVisible, [key]:true})
                return false;
            }
        } else if(key==='password'){
            if(value===signupInfo.passwordCheck){
                setErrorVisible({...errorVisible, passwordCheck:false})
            }
            if(regPassword.test(value)){
                setErrorVisible({...errorVisible, [key]:false})
            }else{
                setErrorVisible({...errorVisible,[key]:true})
            }
        } else if(key==='passwordCheck'){
            if(value===signupInfo.password){
                setErrorVisible({...errorVisible,[key]:false})
            }else{
                setErrorVisible({...errorVisible,[key]:true})
            }
        }
    }

    const onSubmitHandler = (e) => {
        if(signupInfo.email.length>0 && signupInfo.userName.length>0 && signupInfo.password.length>0 && signupInfo.passwordCheck>0){
            setErrorVisible({...errorVisible,somethingMissed:false})
            if(errorVisible.email===false && errorVisible.password===false && errorVisible.passwordCheck===false){
                axios
                    .post('http://moti.log/user/signup',{
                        email:signupInfo.email,
                        username:signupInfo.userName,
                        password:signupInfo.password
                    })
                    .then( res => {
                        console.log(res)
                        if(!!(res.id)){
                            //!회원가입 성공 코드 작성.
                            document.location.href='/'
                        }
                    })
            }
        }else{
            setErrorVisible({...errorVisible,somethingMissed:true})
        }
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
                        onChange={handleInputValue('email')}
                        onBlur={validationCheck('email')}
                    />
                    <img 
                        src="https://img.icons8.com/ios/24/000000/new-post.png"
                        className = 'signup__box__input__email__image'
                    />
                    <div className={errorVisible.email ?  'signup__box__input__email__error error': 'signup__box__input__email__error error hide'}>
                        이메일 형식으로 입력해야합니다.
                    </div>
                </div>
                <div className='signup__box__input__user-name'>
                    <input
                        name='userName'
                        className ='signup__box__input__user-name__input' 
                        type="text" 
                        placeholder='user name' 
                        onChange={handleInputValue('userName')}
                        onBlur={validationCheck('userName')}/
                    >
                    <img 
                        src="https://img.icons8.com/ios/24/000000/user--v1.png"
                        className='signup__box__input__user-name__image'
                    />
                </div>
                <div className='signup__box__input__password'>
                    <input
                        name='password'
                        className ='signup__box__input__password__input' 
                        type="password" 
                        placeholder='password' 
                        onChange={handleInputValue('password')}
                        onBlur={validationCheck('password')}/
                    >
                    <img 
                        src="https://img.icons8.com/ios/50/000000/lock--v1.png"
                        className = 'signup__box__input__password__image'
                    />
                    <div className={errorVisible.password ?  'signup__box__input__password__error error': 'signup__box__input__password__error error hide'}>
                        비밀번호는 숫자와 영문자 조합으로 8~20자리를 사용해야 합니다.
                    </div>
                </div>
                <div className='signup__box__input__password-check'>
                    <input
                        name='passwordCheck'
                        className ='signup__box__input__password-check__input' 
                        type="password" 
                        placeholder='password check' 
                        onChange={handleInputValue('passwordCheck')}
                        onBlur={validationCheck('passwordCheck')}/
                    >
                    <img 
                        src="https://img.icons8.com/ios/50/000000/lock--v1.png"
                        className = 'signup__box__input__password-check__image'
                    />
                    <div className={errorVisible.passwordCheck ?  'signup__box__input__password-check__error error': 'signup__box__input__password-check__error error hide'}>
                        비밀번호가 일치하지 않습니다.
                    </div>
                </div>
            </div>
            <div className='signup__box__btn-area'>
                <button className='signup__box__btn-area__btn' onClick={onSubmitHandler}>
                    sign up
                </button>
                <div className={errorVisible.somethingMissed? 'signup__box__btn-area__error error':'signup__box__btn-area__error error hide'}>
                    모든 항목을 입력해주세요.
                </div>
            </div>
        </div>
    )
}