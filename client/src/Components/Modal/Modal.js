
import EditPassword from "./EditPassword";
import EditProfile from "./EditProfile";

export default function Modal ({profileHandler, accessTokenHandler, loginHandler, userInfo, modalState, modalHandler }) {
    return(
        <div className='header__modal-container'>
            <div className='modal'>
                {modalState==='profile'? 
                    <EditProfile  profileHandler={profileHandler} accessTokenHandler={accessTokenHandler} loginHandler={loginHandler} userInfo={userInfo} modalState={modalState} modalHandler={modalHandler}/>
                    : 
                    <EditPassword  accessTokenHandler={accessTokenHandler} loginHandler={loginHandler} userInfo={userInfo} modalState={modalState} modalHandler={modalHandler}/>
                }
            </div>
        </div>
    )
}