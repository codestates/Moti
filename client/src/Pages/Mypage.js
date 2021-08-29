import React from "react";
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import Footer from '../Components/Footer';
import Post from '../Components/Post';
import '../Components/mypage.css';

function Mypage({loginHandler, userInfo, accessTokenHandler,logoutHandler}) {
    // 구조분해해서 가져갈 부분만 가져가도
    const { isLogin, accessToken, advice, username, profile} = userInfo
    // console.log(userInfo);
    return (
       <div className="mypage"> 
        <Header loginHandler={loginHandler} userInfo={userInfo} logoutHandler={logoutHandler}/>
            <div className="mypage__container">
             <Sidebar userInfo={userInfo} />
             <Post isLogin={isLogin} accessToken={accessToken} accessTokenHandler={accessTokenHandler}/> 
            </div>
        <Footer />
       </div>
    )

}
// username={username} profile={profile}
export default Mypage