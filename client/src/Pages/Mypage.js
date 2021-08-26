import React from "react";
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import Footer from '../Components/Footer';
import Post from '../Components/Post';
import '../Components/mypage.css';

function Mypage() {
    return (
       <div className="mypage"> 
        <Header />
        <Sidebar />
        <Post />
        <Footer />
       </div>
    )

}

export default Mypage