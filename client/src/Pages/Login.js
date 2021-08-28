import  React , {useEffect} from "react";
import LoginContainer from '../Components/LoginContainer'


function Login () {

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
            <LoginContainer />
        </div>
    );
}

export default Login;
