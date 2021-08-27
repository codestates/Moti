import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Mypage from './Pages/Mypage';
import Dashboard from './Pages/Dashboard';
import Notfound from './Pages/Notfound';

import './App.css';
import axios from 'axios';

function App() {

<<<<<<< HEAD
  useEffect(()=>{

    const url = new URL(window.location.href)
    const authorizationCode = url.searchParams.get('code')
    if (authorizationCode) {
      console.log(authorizationCode);
      getAccessToken(authorizationCode)
    }
  })
  
=======
>>>>>>> d5e5240b3e4d6c9d861d72ad31c255701ff63754
  return (
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
        <Route path='*'>
          <Notfound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;