
import EditPassword from "./EditPassword";
import EditProfile from "./EditProfile";

export default function Modal ({ modalState, modalHandler }) {
    return(
        <div className='header__setting-modal'>
            {modalState==='profile'? 
                <EditProfile  modalState={modalState} modalHandler={modalHandler}/>
                : 
                <EditPassword  modalState={modalState} modalHandler={modalHandler}/>
            }
        </div>
    )
}