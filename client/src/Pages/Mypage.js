import React from "react";
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import Footer from '../Components/Footer';
import Post from '../Components/Post';
import '../Components/mypage.css';

function Mypage({profileHandler, loginHandler, accessTokenHandler,logoutHandler}) {
    // 구조분해해서 가져갈 부분만 가져가도
    const { isLogin, accessToken, advice, username, profile} = JSON.parse(window.localStorage.getItem('userInfo'));
    // console.log(userInfo);
    return (
       <div className="mypage"> 
        <Header profileHandler={profileHandler} accessTokenHandler={accessTokenHandler} loginHandler={loginHandler} logoutHandler={logoutHandler}/>
            <div className="mypage__container">
             <Sidebar />
             <Post accessTokenHandler={accessTokenHandler}/> 
            </div>
        <Footer />
       </div>
    )

}
// username={username} profile={profile}
export default Mypage