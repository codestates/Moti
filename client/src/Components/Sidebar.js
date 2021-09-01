import  React from "react";
import {Buffer} from 'buffer'

function Sidebar() {
  
  let user = JSON.parse(window.localStorage.getItem("userInfo"));   
   
    return (
       <div className="sidebar"> 
         <div className="sidebar__box">
             <div className="sidebar__box__user">
                 <div className="sidebar__box__user__picbox">
                    <img src={typeof(user.profile)==='string'? user.profile : 'data:image/png;base64,'+ Buffer(user.profile, 'binary').toString('base64')}
                     alt="profile" className="sidebar__box__user__picbox__pic" />
                 </div>
                 <p className="sidebar__box__user__text">환영합니다 <span>{user.username}</span>님</p>
             </div>
             <div className="sidebar__box__proverb">
                 <div className="sidebar__box__proverb__title">today's proverb ▶</div>
                 <div className="sidebar__box__proverb__content mp">
                    <p>"{user.advice}"</p>
                    -{user.author}- 
                 </div>
             </div>
         </div>
          
       </div>
    )

}

export default Sidebar