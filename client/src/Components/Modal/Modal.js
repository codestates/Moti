
import EditPassword from "./EditPassword";
import EditProfile from "./EditProfile";

export default function Modal ( modalState, modalHandler ) {
    return(
        <div className='header__setting-modal'>
            <EditPassword />
            {/* {modalState==='profile'? 
                <EditProfile /> 
                : 
                <EditPassword />
            } */}
        </div>
    )
}