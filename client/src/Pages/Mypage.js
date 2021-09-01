import React,{useEffect, useState} from "react";
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import Footer from '../Components/Footer';
import Post from '../Components/Post';
import '../Components/mypage.css';


function Mypage({profileHandler, loginHandler, accessTokenHandler,logoutHandler}) {  


    const { isLogin, accessToken, advice, username, profile} = JSON.parse(window.localStorage.getItem('userInfo'));
    
  
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

export default Mypage