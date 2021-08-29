import React from "react";
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import Footer from '../Components/Footer';
import Post from '../Components/Post';
import '../Components/mypage.css';

function Mypage({loginHandler, userInfo}) {
    // 구조분해해서 가져갈 부분만 가져가도
    // const { id, accessToken, username, profile, RandomAdvice} = userInfo
    console.log(userInfo);
    return (
       <div className="mypage"> 
        <Header loginHandler={loginHandler} userInfo={userInfo}/>
            <div className="mypage__container">
             <Sidebar userInfo={userInfo}/>
             <Post userInfo={userInfo}/> 
            </div>
        <Footer />
       </div>
    )

}

export default Mypage