import  React,{ useState, useEffect}  from "react";
import {Buffer} from 'buffer'

function Sidebar() {
  
  let user = JSON.parse(window.localStorage.getItem("userInfo"));
  console.log(user.profile);
   let imageUrl = 'data:image/png;base64,'+ Buffer(user.profile, 'binary').toString('base64')
    // useEffect(()=>{
    // },[])  props로 받아온 프로필사진과 어드바이스,(+저자) 렌더링-> 늘 로그인되있을 것이므로 useEffect 필요 없다?
   
    return (
       <div className="sidebar"> 
         <div className="sidebar__box">
             <div className="sidebar__box__user">
                 <div className="sidebar__box__user__picbox">
                    <img src={imageUrl} alt={""} className="sidebar__box__user__picbox__pic"/>
                 </div>
                 <p className="sidebar__box__user__text">환영합니다 <span>{user.username}</span>님</p>
             </div>
             <div className="sidebar__box__proverb">
                 <div className="sidebar__box__proverb__title">today's proverb ▶</div>
                 <div className="sidebar__box__proverb__content">
                    <p>"{user.advice}"</p>
                    -{user.author}- 
                 </div>
             </div>
         </div>
          
       </div>
    )

}

export default Sidebar