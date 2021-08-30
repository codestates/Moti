
import EditPassword from "./EditPassword";
import EditProfile from "./EditProfile";

export default function Modal ({loginHandler, userInfo, modalState, modalHandler }) {
    return(
        <div className='header__modal-container'>
            <div className='modal'>
                {modalState==='profile'? 
                    <EditProfile  loginHandler={loginHandler} userInfo={userInfo} modalState={modalState} modalHandler={modalHandler}/>
                    : 
                    <EditPassword  loginHandler={loginHandler} userInfo={userInfo} modalState={modalState} modalHandler={modalHandler}/>
                }
            </div>
        </div>
    )
}