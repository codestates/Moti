
export default function EditPassword () {
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
                    />
                    <div className='header__setting-modal__password__input__current-password__error'>

                    </div>
                </div>
                <div className='header__setting-modal__password__input__new-password'>
                    <div className='header__setting-modal__password__input__new-password__text'>
                        새 비밀번호
                    </div>
                    <input
                        className='header__setting-modal__password__input__new-password__input'
                    />
                    <div className='header__setting-modal__password__input__new-password__error'>
                        
                    </div>
                </div>
                <div className='header__setting-modal__password__input__new-password-check'>
                    <div className='header__setting-modal__password__input__new-password-check__text'>
                        비밀번호 확인
                    </div>
                    <input
                        className='header__setting-modal__password__input__new-password-check__input'
                    />
                    <div className='header__setting-modal__password__input__new-password-check__error'>
                        
                    </div>
                </div>
            </div>
            <div className='header__setting-modal__password__btn'>
                <button className='header__setting-modal__password__btn__change'>
                    변경
                </button>
                <button className='header__setting-modal__password__btn__cancel'>
                    취소
                </button>
            </div>
        </div>
    )
}