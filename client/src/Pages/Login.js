import  React from "react";
import { useHistory } from "react-router-dom";
import LoginContainer from '../Components/LoginContainer'


function Login ({ loginHandler}) {
    const history = useHistory();

    if(JSON.parse(window.localStorage.getItem("userInfo"))!== null
      && !!JSON.parse(window.localStorage.getItem("userInfo")).isLogin){
        history.push('/mypage')
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
            <LoginContainer loginHandler={loginHandler}/>
        </div>
    );
}

export default Login;
