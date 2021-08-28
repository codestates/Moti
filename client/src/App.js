import React , {useState, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Mypage from './Pages/Mypage';
import Dashboard from './Pages/Dashboard';
import Notfound from './Pages/Notfound';

import './App.css';
import axios from 'axios';

function App() {

  const [userInfo, setUserInfo] = useState({
    "isLogin" : false,
    "accessToken" : "",
    "advice" : "",
    "username" : "",
    "profile" : ""
  })

  // if(!!(window.localStorage.userInfo)){
  //   setUserInfo(JSON.parse(window.localStorage.getItem('userInfo')));
  // }

  useEffect( () => {
    let tmp = `{"isLogin":${userInfo.isLogin},"accessToken":"${userInfo.accessToken}","advice":"${userInfo.advice}","username":"${userInfo.username}","profile":"${userInfo.profile}"}`;

    window.localStorage.setItem('userInfo',tmp);
  }, [userInfo])

  const loginHandler = (accessToken, advice, username, profile) => {
    setUserInfo({
      ...userInfo,
      "isLogin" : true,
      "accessToken" : accessToken,
      "advice" : advice,
      "username" : username,
      "profile" : profile
    })
  }
  
  const logoutHandler = () => {
    setUserInfo({
      "isLogin" : false,
      "accessToken" : '',
      "advice" : '',
      "username" : '',
      "profile" : ''
    })
  }

  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Login loginHandler={loginHandler} userInfo={userInfo}/>
        </Route>
        <Route path='/signup'>
          <SignUp />
        </Route>
        <Route path='/mypage'> {/*수정 필요? 로그인하면 유저의 마이페이지로 가는 라우팅 id*/}
          <Mypage loginHandler={loginHandler} userInfo={userInfo} />
        </Route>
        <Route path='/dashboard'>
          <Dashboard />
        </Route>
        <Route path='*'>
          <Notfound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;