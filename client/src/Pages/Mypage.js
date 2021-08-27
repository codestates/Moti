import React from "react";
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import Footer from '../Components/Footer';
import Post from '../Components/Post';
import '../Components/mypage.css';

function Mypage(props) {
    //임시로 props / 구조분해해서 가져갈 부분만 가져가도
    return (
       <div className="mypage"> 
        <Header props={props}/>
            <div className="mypage__container">
             <Sidebar props={props}/>
             <Post props={props}/>
            </div>
        <Footer />
       </div>
    )

}

export default Mypage