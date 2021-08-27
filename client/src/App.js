import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './Pages/Login';

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

    const url = new URL(window.location.href)
    const authorizationCode = url.searchParams.get('code')
    if (authorizationCode) {
      console.log(authorizationCode);
      getAccessToken(authorizationCode)
    }
  })
  
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
