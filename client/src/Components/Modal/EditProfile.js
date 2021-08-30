import React, {useState} from "react"
import axios from 'axios'

const defaultImage = require('../../assets/bros_blank.jpg')

export default function EditProfile ({accessTokenHandler, loginHandler, userInfo, modalState, modalHandler }) {
    let currentProfileImage
    if(typeof(userInfo.profile)==='string'){
        currentProfileImage = userInfo.profile;
    }else{
        currentProfileImage = 'data:image/png;base64, '+Buffer(userInfo.profile,'binary').toString('base64');
    }
    console.log(userInfo)
    const [currentInput, setCurrentInput] = useState({
        imageFile:'',
        previewUrl:'',
        username:''
    })

    const [submitError, setSubmitError] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleInputValue = (key) => (e) => {
        setSubmitError(false);
        setSubmitSuccess(false);
        setCurrentInput({ ...currentInput, [key]:e.target.value})
    }

    const imageFileHandler = (key) => (e) => {
        setSubmitError(false);
        setSubmitSuccess(false);
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        console.log(file)
        reader.onloadend = () => {
            setCurrentInput({
                imageFile : file,
                previewUrl : reader.result
            })
        }
        reader.readAsDataURL(file);
    }

    const deleteImage = () => {
        setSubmitError(false);
        setSubmitSuccess(false);
        if(!!(currentInput.imageFile)){
            setCurrentInput({
                ...currentInput,
                imageFile:'',
                previewUrl:''
            })
        }else{
            setCurrentInput({
                ...currentInput,
                imageFile: 'default_profile',
                previewUrl: 'bros_blank.jpg'
            })
        }
    }

    const onSubmitHandler = (e) => {
        // put 성공시 setSubmitSuccess(true);, userinfo 변경(이미지 변경시 이미지만, 프로필 변경시 프로필만), currentInput 초기화
        // put 실패시 setSubmitError(true);
        let tmpAccessToken = 'Bearer ' + userInfo.accessToken;
        const formData = new FormData();
        formData.append("picture",currentInput.imageFile);
        formData.append("username",currentInput.username);

        // if(!!(currentInput.imageFile) && !!(currentInput.username)){
        //     formData.append("picture",currentInput.imageFile);
        //     formData.append("username",currentInput.username);
        // }else if (!!(currentInput.imageFile)){
        //     formData.append("picture",currentInput.imageFile);
        // }else {
        //     formData.append("username",currentInput.username);
        // }

        if(!!(currentInput.imageFile) || !!(currentInput.username)){
            console.log(userInfo.accessToken)
            console.log(formData)
            axios
                .post(process.env.REACT_APP_URL+'user/changeprofile',formData,{
                    headers:{
                        'content-type': 'multipart/form-data',
                        authorization:tmpAccessToken
                    },
                    withCredentials: true
                })
                .then((res)=>{
                    setSubmitSuccess(true)
                    if(res.headers.accessToken){
                        accessTokenHandler(res.headers.accessToken)
                    }
                    console.log(res)
                })
                .catch((error)=>{
                    console.log('error')
                })
        }
    }

    return(
        <div className='header__setting-modal__profile'>
            <div className='header__setting-modal__profile__tittle'>
                개인정보 변경
            </div>
            <div className='header__setting-modal__profile__edit-image'>
                <div className='header__setting-modal__profile__edit-image__text'>
                    프로필 사진
                </div>
                <div className='header__setting-modal__profile__edit-image__input'>
                    <img 
                        className='header__setting-modal__profile__edit-image__input__image' 
                        src={!!(currentInput.imageFile)? currentInput.previewUrl : currentProfileImage}
                    />
                    <div className='header__setting-modal__profile__edit-image__input__btn'>
                        <div className='header__setting-modal__profile__edit-image__input__btn__insert'>
                            <label 
                                className='header__setting-modal__profile__edit-image__input__btn__insert__label'   
                            >
                                이미지 업로드
                                <input
                                className='header__setting-modal__profile__edit-image__input__btn__insert__input'
                                type='file'
                                accept='image/jpg, image/png, image/jpeg'
                                name='profileImage'
                                onChange={imageFileHandler('imageFile')}
                            />
                            </label>
                        
                        </div>
                        <button 
                            className='header__setting-modal__profile__edit-image__input__btn__delete'
                            onClick={deleteImage}
                        >
                            이미지 삭제
                        </button>
                    </div>
                </div>
            </div>
            <div className='header__setting-modal__profile__edit-username'>
                <div className='header__setting-modal__profile__edit-username__text'>
                    유저 이름
                </div>
                <input
                    className='header__setting-modal__profile__edit-username__input'
                    onChange={handleInputValue('username')}
                />
            </div>
            <div className='header__setting-modal__profile__btn'>
                <button
                    className='header__setting-modal__profile__btn__submit'
                    onClick={onSubmitHandler}
                >
                    적용
                </button>
                <button
                    className='header__setting-modal__profile__btn__cancel'
                    onClick={modalHandler('none')}
                >
                    취소
                </button>
            </div>
            <div className='header__setting-modal__profile__error'>
                <div className={submitError? 'header__setting-modal__profile__error__error' : 'header__setting-modal__profile__error__error hide'}>
                    페이지가 만료되었습니다. 다시 로그인해주세요.
                </div>
                <div
                    className={submitSuccess? 'header__setting-modal__profile__error__success' : 'header__setting-modal__profile__error__success hide'}
                >
                    개인 정보가 변경되었습니다.
                </div>
            </div>
        </div>
    )
}