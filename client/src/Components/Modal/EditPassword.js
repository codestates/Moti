import React, { useState } from "react";
import axios from 'axios';

const serverurl = 'http://localhost:80';

export default function EditPassword ({ modalState, modalHandler }) {
    console.log(modalState);
    console.log(modalHandler);
    const [currentInput, setCurrentInput] = useState({
        currentPassword: '',
        newPassword: '',
        newPasswordCheck: ''
    })

    const [errorVisible, setErrorVisible] = useState({
        currentPassword:false,
        newPassword:false,
        newPasswordCheck:false,
        somethingMissed:false
    })

    const [editError, setEditError] = useState(false);

    const handleInputValue = (key) => (e) => {
        setEditError(false)
        setCurrentInput({ ...currentInput, [key]:e.target.value})
    }

    const validationCheck = (key) => (e) => {
        let value = e.target.value;
        let regPassword = /^[a-zA-Z0-9]{8,20}$/
        if(key==='newPassword'){
            if(value===currentInput.newPasswordCheck){
                setErrorVisible({...errorVisible, newPasswordCheck:false})
            }
            if(regPassword.test(value)){
                setErrorVisible({...errorVisible, [key]:false})
            }else{
                setErrorVisible({...errorVisible, [key]:true})
            }
        }else if (key==='newPasswordCheck'){
            if(value===currentInput.newPassword){
                setErrorVisible({...errorVisible, [key]:false})
            }else{
                setErrorVisible({...errorVisible, [key]:true})
            }
        }
    }

    const onSubmitHandler = (e) => {
        if(!!(currentInput.currentPassword) && !!(currentInput.newPassword) && !!(currentInput.newPasswordCheck)){
            setErrorVisible({...errorVisible, somethingMissed:false});
            if(!(errorVisible.currentPassword) && !(errorVisible.newPassword) && !(errorVisible.newPasswordCheck)){
                axios
                    .patch(serverurl+'/changepassword',{
                        nowpassword: currentInput.currentPassword,
                        newpassword: currentInput.newPassword
                    },
                    {
                        headers:{
                            // !authorization 내려와서 추가
                            Autorization:''
                        }
                    })
                    .catch( error => {
                        setEditError(true);
                    })
            }
        } else {
                setErrorVisible({...errorVisible, somethingMissed:true})
            }
    }

    return(
        <div className='header__setting-modal__password'>
            <div className='header__setting-modal__password__tittle'>
                비밀번호 변경
            </div>
            <div className='header__setting-modal__password__input'>
                <div className='header__setting-modal__password__input__current-password'>
                    <div className='header__setting-modal__password__input__current-password__text'>
                        현재 비밀번호
                    </div>
                    <input
                        className='header__setting-modal__password__input__current-password__input'
                        type='password'
                        name='currentPassword'
                        onChange={handleInputValue('currentPassword')}
                        onBlur={validationCheck('currentPassword')}
                    />
                    <div className= {errorVisible.currentPassword? 'header__setting-modal__password__input__current-password__error error' : 'header__setting-modal__password__input__current-password__error error hide'}>

                    </div>
                </div>
                <div className='header__setting-modal__password__input__new-password'>
                    <div className='header__setting-modal__password__input__new-password__text'>
                        새 비밀번호
                    </div>
                    <input
                        className='header__setting-modal__password__input__new-password__input'
                        type='password'
                        name='newPassword'
                        onChange={handleInputValue('newPassword')}
                        onBlur={validationCheck('newPassword')}
                    />
                    <div className= {errorVisible.newPassword? 'header__setting-modal__password__input__new-password__error error' : 'header__setting-modal__password__input__new-password__error error hide'}>
                        비밀번호는 숫자와 영문자 조합으로 8~20자리를 사용해야 합니다.
                    </div>
                </div>
                <div className='header__setting-modal__password__input__new-password-check'>
                    <div className='header__setting-modal__password__input__new-password-check__text'>
                        비밀번호 확인
                    </div>
                    <input
                        className='header__setting-modal__password__input__new-password-check__input'
                        type='password'
                        name='newPasswordCheck'
                        onChange={handleInputValue('newPasswordCheck')}
                        onBlur={validationCheck('newPasswordCheck')}
                    />
                    <div className={errorVisible.newPasswordCheck? 'header__setting-modal__password__input__new-password-check__error error' : 'header__setting-modal__password__input__new-password-check__error error hide'}>
                        비밀번호가 일치하지 않습니다.
                    </div>
                </div>
            </div>
            <div className='header__setting-modal__password__btn'>
                <button className='header__setting-modal__password__btn__change' 
                    onClick={onSubmitHandler}
                >
                    변경
                </button>
                <button className='header__setting-modal__password__btn__cancel'
                    onClick={modalHandler('none')}
                >
                    {/* modalstate none으로 */}
                    취소
                </button>
            </div>
            <div className='header__setting-modal__password__error'>
                <div className={errorVisible.somethingMissed? 'header__setting-modal__password__error__something-missed error' : 'header__setting-modal__password__error__something-missed error hide'}>
                    모든 항목을 입력해주세요.
                </div>
                <div className={editError? 'header__setting-modal__password__error__fail error' : 'header__setting-modal__password__error__fail error hide'}>
                    현재 비밀번호가 일치하지 않습니다.
                </div>
            </div>
        </div>
    )
}