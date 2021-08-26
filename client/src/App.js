import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Mypage from './Pages/Mypage';
import Dashboard from './Pages/Dashboard';
import Notfound from './Pages/Notfound';

import './App.css';
import { useEffect } from 'react';
import axios from 'axios';


const GITHUB_LOGIN_URL = `https://github.com/login/oauth/authorize?client_id=0eda0c23f9078b24bbe1`;
//배포환경에서 실행한다면 github 콜백주소 변경해줘야함
const serverurl = 'http://localhost:80'; // 배포환경시 수정필요

const socialLoginHandler = () =>{
  window.location.assign(GITHUB_LOGIN_URL);
}

const getAccessToken = async (authorizationCode) =>{

  const url = serverurl+'/oauthgit';
  let resp = await axios.post(url, { authorizationCode: authorizationCode })
  console.log(resp);

}
function App() {

  useEffect(()=>{
    const script = document.createElement('script');
    script.src="https://apis.google.com/js/platform.js";
    document.body.appendChild(script);
    

    const url = new URL(window.location.href)
    const authorizationCode = url.searchParams.get('code')
    if (authorizationCode) {
      console.log(authorizationCode);
      getAccessToken(authorizationCode)
    }

    return () => {
      document.body.removeChild(script);
    }
  })
  
  return (
    // <div className="App">
      
    //   <button onClick={socialLoginHandler}>oauth_test</button>
    //   <div class="g-signin2" data-onsuccess="onSignIn"></div>
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <Router>
      <Switch>
        <Route exact path='/'>
          <Login />
        </Route>
        <Route path='/signup'>
          <SignUp />
        </Route>
        <Route path='/mypage'> {/*수정 필요? 로그인하면 유저의 마이페이지로 가는 라우팅 id*/}
          <Mypage />
        </Route>
        <Route path='/dashboard'>
          <Dashboard />
        </Route>
        <Route path='/notfound'>
          <Notfound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
