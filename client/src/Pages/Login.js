import  React , {useEffect} from "react";
import LoginContainer from '../Components/LoginContainer'


function Login ({ loginHandler, userInfo }) {
    if(userInfo.isLogin){
        document.location.href='/mypage'
    }
    return (
        <div className='login'>
            <div className='login__tittle'>
                <h1 className='login__tittle__wanna-rest'>
                    Wanna Rest?
                </h1>
                <h1 className='login__tittle__moti'>
                    Moti
                </h1>
            </div>
            <LoginContainer loginHandler={loginHandler} userInfo={userInfo}/>
        </div>
    );
}

export default Login;
