import React , {useState, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';

import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Mypage from './Pages/Mypage';
import Dashboard from './Pages/Dashboard';
import Notfound from './Pages/Notfound';

import './App.css';
import axios from 'axios';

axios.defaults.withCredentials = true;

function App() {
  const [userInfo, setUserInfo] = useState( JSON.parse(window.localStorage.getItem("userInfo"))|| {
    isLogin : false,
    isSocial: false,
    accessToken : "",
    advice : "",
    author : "",
    username : "",
    profile : ""
  })

  useEffect( () => {
    window.localStorage.setItem('userInfo',JSON.stringify(userInfo));
  }, [userInfo])

  const loginHandler = (accessToken, advice, author, username, profile, isSocial) => {
    setUserInfo({
      isLogin : true,
      isSocial : isSocial,
      accessToken : accessToken,
      advice : advice,
      author : author,
      username : username,
      profile : profile
    })
    console.log(JSON.parse(window.localStorage.getItem("userInfo")));
  }
  
  const logoutHandler = () => {
    setUserInfo({
      isLogin : false,
      isSocial : false,
      accessToken : '',
      advice : '',
      author : '',
      username : '',
      profile : ''
    });
  }

  const accessTokenHandler = (newAccessToken) => {
    setUserInfo({
      ...userInfo,
      accessToken : newAccessToken
    })
  }

  const profileHandler = (imageUrl, username) => {
    if(!!(imageUrl) && !!(username)){
      setUserInfo({
        ...userInfo,
        profile: imageUrl,
        username: username
      })
    }
    else if(!!(imageUrl)){
      setUserInfo({
        ...userInfo,
        profile: imageUrl
      })
    }
    else if(!!(username)){
      setUserInfo({
        ...userInfo,
        username: username
      })
    }
  }

  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Login loginHandler={loginHandler}/>
        </Route>
        <Route path='/signup'>
          <SignUp />
        </Route>
        <Route path='/mypage'>
          <Mypage profileHandler={profileHandler} loginHandler={loginHandler} accessTokenHandler={accessTokenHandler} logoutHandler={logoutHandler}/>
        </Route>
        <Route path='/dashboard'>
          <Dashboard profileHandler={profileHandler} loginHandler={loginHandler} accessTokenHandler={accessTokenHandler} logoutHandler={logoutHandler}/>
        </Route>
        <Route path='*'>
          <Notfound />
        </Route>
      </Switch>
    </Router>
  );
}

export default withRouter(App);