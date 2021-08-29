import React, {useState} from "react"
import axios from 'axios'

export default function EditProfile ({loginHandler, userInfo, modalState, modalHandler }) {
    // current Input으로 기존의 userInfo 받아와야할 것 받아오기
    // 현재 유저 정보를 currenInput에 담지 않고 이미지만 렌더링되도록 할 수 있지 않을까
    const [currentInput, setCurrentInput] = useState({
        imageFile:'',
        previewUrl:'',
        username:''
    })

    const [submitError, setSubmitError] = useState(false)

    const handleInputValue = (key) => (e) => {
        setCurrentInput({ ...currentInput, [key]:e.target.value})
    }

    const imageFileHandler = (key) => (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            setCurrentInput({
                imageFile : file,
                previewUrl : reader.result
            })
            console.log(reader.result)
        }
        reader.readAsDataURL(file);
        console.log(file)

    }

    const deleteImage = () => {
        // 이미지 삭제시 currentInput에 첨부한 이미지 삭제 혹은 currenInput 기본이미지로 변경
    }

    const onSubmitHandler = (e) => {
        // app.js의 userinfo 변경, 서버에 patch
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
                        src={currentInput.previewUrl}
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
                    className='header__setting-modal__profile__error__success'
                >
                    개인 정보가 변경되었습니다.
                </div>
            </div>
        </div>
    )
}