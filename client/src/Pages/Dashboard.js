import React from "react";

import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import Footer from '../Components/Footer';
import GoogleSearch from "../Components/Dash";

import '../Components/mypage.css';
import '../Components/Dash/dash.css';

function Dashboard({profileHandler, loginHandler, accessTokenHandler,logoutHandler}) {
 return(
    <div className="dashboard mypage"> 
        <Header profileHandler={profileHandler} accessTokenHandler={accessTokenHandler} loginHandler={loginHandler} logoutHandler={logoutHandler}/>
            <div className="dashboard__container mypage__container">
                <Sidebar />
                <GoogleSearch accessTokenHandler={accessTokenHandler} />
            </div>
        <Footer />
   </div>
 )
}

export default Dashboard