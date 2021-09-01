import React, {useState} from "react"
import axios from 'axios'

export default function EditProfile ({profileHandler, accessTokenHandler, loginHandler, userInfo, modalState, modalHandler }) {
    let currentProfileImage
    if(typeof(userInfo.profile)==='string'){
        currentProfileImage = userInfo.profile;
    }else{
        currentProfileImage = 'data:image/png;base64, '+Buffer(userInfo.profile,'binary').toString('base64');
    }
    const [currentInput, setCurrentInput] = useState({
        imageFile:'',
        previewUrl:'',
        username:''
    })

    const [imageSizeError, setImageSizeError] = useState(false);
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
        if(file.size>4000000){
            setImageSizeError(true)
        }else{
            setImageSizeError(false)
            reader.onloadend = () => {
                setCurrentInput({
                    imageFile : file,
                    previewUrl : reader.result
                })
            }
            reader.readAsDataURL(file);
        }
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

    const onSubmitHandler = async (e) => {
        const MAX_WIDTH = 320;
        const MAX_HEIGHT = 180;
        const MIME_TYPE = "image/jpeg";
        const QUALITY = 0.7;

        let imgforaxios;
        
        const file = currentInput.imageFile; // get the file
        const blobURL = URL.createObjectURL(file);
        const img = new Image();
        img.src = blobURL;
        img.onerror = function () {
            URL.revokeObjectURL(this.src);
            console.log("Cannot load image");
        };
        img.onload = await function () {
            URL.revokeObjectURL(this.src);
            const [newWidth, newHeight] = calculateSize(img, MAX_WIDTH, MAX_HEIGHT);
            const canvas = document.createElement("canvas");
            canvas.width = newWidth;
            canvas.height = newHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, newWidth, newHeight);
            canvas.toBlob(
            (blob) => {
                imgforaxios=blob;
                let tmpAccessToken = 'Bearer ' + userInfo.accessToken;
                const formData = new FormData();
                formData.append("picture",imgforaxios);
                formData.append("username",currentInput.username);

                if(!!(currentInput.imageFile) || !!(currentInput.username)){
                    axios
                        .post(process.env.REACT_APP_URL+'/user/changeprofile',formData,{
                            headers:{
                                'content-type': 'multipart/form-data',
                                authorization: tmpAccessToken
                            },
                            withCredentials: true
                        })
                        .then((res)=>{
                            setSubmitSuccess(true)
                            if(res.headers.accessToken){
                                accessTokenHandler(res.headers.accessToken)
                            }
                            profileHandler(currentInput.previewUrl, currentInput.username);
                        })
                        .catch((error)=>{
                            console.log('error')
                        })
                }
            },
            MIME_TYPE,
            QUALITY
            );
        };
        

        function calculateSize(img, maxWidth, maxHeight) {
        let width = img.width;
        let height = img.height;

        // calculate the width and height, constraining the proportions
        if (width > height) {
            if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
            }
        } else {
            if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
            }
        }
        return [width, height];
        }

        
    }

    return(
        <div className='header__setting-modal__profile'>
            <div className='header__setting-modal__profile__tittle'>
                개인정보 변경
            </div>
            <div className='header__setting-modal__profile__edit-image'>
                <div>
                    <div className='header__setting-modal__profile__edit-image__text'>
                        프로필 사진
                    </div>
                    <div className='header__setting-modal__profile__edit-image__text'>
                        (최대 4MB)
                    </div>
                </div>
                <div className='header__setting-modal__profile__edit-image__input'>
                    <img 
                        className='header__setting-modal__profile__edit-image__input__image' 
                        alt='user profile'
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
                                disabled = {userInfo.isSocial? 'disabled' : ''}
                            />
                            </label>
                        
                        </div>
                        <button 
                            className='header__setting-modal__profile__edit-image__input__btn__delete'
                            onClick={deleteImage}
                            disabled = {userInfo.isSocial? 'disabled' : ''}
                        >
                            이미지 삭제
                        </button>
                    </div>
                    <div
                        className={imageSizeError? 'header__setting-modal__profile__edit-image__size-error error' : 'header__setting-modal__profile__edit-image__size-error error hide'}
                    >
                        4MB 미만의 이미지만 업로드해주세요.
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
                    disabled = {userInfo.isSocial? 'disabled' : ''}
                />
            </div>
            <div className='header__setting-modal__profile__btn'>
                <button
                    className='header__setting-modal__profile__btn__submit'
                    onClick={onSubmitHandler}
                    disabled = {userInfo.isSocial? 'disabled' : ''}
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
                <div
                    className={userInfo.isSocial? 'header__setting-modal__profile__error__error error' : 'header__setting-modal__profile__error__error error hide'}
                >
                    소셜 로그인 유저는 프로필을 변경할 수 없습니다.
                </div>
            </div>
        </div>
    )
}