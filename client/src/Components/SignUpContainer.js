import axios from 'axios';
import React, {useState} from 'react';

export default function SignUpContainer () {
    const [signupInfo, setSignupInfo] = useState({
        email:'',
        emailCode:'',
        userName:'',
        password:'',
        passwordCheck:''
    })

    const [errorVisible, setErrorVisible] = useState({
        email:false,
        emailCode:false,
        userName:false,
        password:false,
        passwordCheck:false,
        somethingMissed:false
    })

    const [signupError, setSignupError] = useState(false);
    const [sendEmail, setSendEmail] = useState(false)
    const [emailCheckSuccess, setEmailCheckSuccess] = useState(false);
    const [emailCheckCode, setEmailCheckCode] = useState('');

    const handleInputValue = (key) => (e) => {
        setSignupError(false);
        if(key==='email'){
            setEmailCheckSuccess(false);
        }
        setSignupInfo({ ...signupInfo, [key]:e.target.value})
    }

    const validationCheck = (key) => (e) => {
        setErrorVisible({...errorVisible,somethingMissed:false})
        let value = e.target.value;
        let regEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
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

    const mailAuthorization = () => {
        if(!(errorVisible.email) && !!(signupInfo.email)){
            console.log('email here');
            console.log(signupInfo.email)
            axios
                .get(process.env.REACT_APP_URL+'/user/getemailcode',{
                    email:signupInfo.email
                })
                .then( res => {
                    setEmailCheckCode(res.data.data.emailcode);
                    setSendEmail(true);
                })
                .catch( error => {
                    console.log(error)
                })
        }
    }

    const mailAuthorizationCheck = () => {
        //setEmailCheckSuccess(true)
        //실패시 setErrorVisible({...errorVisible, emailCheck(true)})
        axios
            .post(process.env.REACT_APP_URL+'/user/emailveri',{
                emailcode:emailCheckCode
            },{
                params:{
                    code: signupInfo.emailCode
                }
            })
            .then( res => {
                console.log(res);
                setErrorVisible({...errorVisible, emailCheck:false})
                setEmailCheckSuccess(true);
            })
            .catch( error => {
                console.log(error);
                setErrorVisible({...errorVisible, emailCheck:true})
            })

    }

    const onSubmitHandler = (e) => {
        if(signupInfo.email && signupInfo.emailCode && signupInfo.userName && signupInfo.password && signupInfo.passwordCheck){
            setErrorVisible({...errorVisible,somethingMissed:false})
            if(!!(emailCheckSuccess) && errorVisible.email===false && errorVisible.emailCode===false && errorVisible.password===false && errorVisible.passwordCheck===false){
                axios
                    .post(process.env.REACT_APP_URL+'/user/signup',{
                        email:signupInfo.email,
                        username:signupInfo.userName,
                        password:signupInfo.password
                    })
                    .then( res => {
                        document.location.href='/'
                    })
                    .catch( error=> {
                        setSignupError(true);
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
                            alt='email'
                            className = 'signup__box__input__email__image'
                        />
                        <div className={errorVisible.email ?  'signup__box__input__email__error error': 'signup__box__input__email__error error hide'}>
                            이메일 형식으로 입력해야합니다.
                        </div>
                        <div className={sendEmail ?  'signup__box__input__email__send': 'signup__box__input__email__send hide'}>
                            이메일로 인증코드가 발송되었습니다.
                        </div>
                        <button
                            className='signup__box__input__email-box__mail-authorization'
                            onClick={mailAuthorization}
                        >
                            메일 인증
                        </button>
                    </div>
                    <div className='signup__box__input__email'>
                        <input
                            name='emailCode'
                            className ='signup__box__input__email__input' 
                            type="text" 
                            placeholder='E-mail code' 
                            onChange={handleInputValue('emailCode')}
                        />
                        <img 
                            src="https://img.icons8.com/ios/24/000000/new-post.png"
                            alt='email'
                            className = 'signup__box__input__email__image'
                        />
                        <div className={errorVisible.emailCheck ?  'signup__box__input__email__error error': 'signup__box__input__email__error error hide'}>
                            이메일 인증에 실패했습니다.
                        </div>
                        <div className={emailCheckSuccess ?  'signup__box__input__email__send': 'signup__box__input__email__send hide'}>
                            이메일로 인증에 성공했습니다.
                        </div>
                        <button
                            className='signup__box__input__email-box__mail-authorization'
                            onClick={mailAuthorizationCheck}
                        >
                            확인
                        </button>
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
                        alt='user'
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
                        alt='password'
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
                        alt='password check'
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
                <div className={signupError? 'signup__box__btn-area__error error':'signup__box__btn-area__error error hide'}>
                    이미 존재하는 이메일입니다.
                </div>
            </div>
        </div>
    )
}