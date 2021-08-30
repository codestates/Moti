import  React,{ useState, useEffect}  from "react";
import {Buffer} from 'buffer'

function Sidebar(props) {
  console.log(props);
   let imageUrl = 'data:image/png;base64, '+ Buffer(props.userInfo.profile, 'binary').toString('base64')
  
   
    return (
       <div className="sidebar"> 
         <div className="sidebar__box">
             <div className="sidebar__box__user">
                 <div className="sidebar__box__user__picbox">
                    <img src={typeof(props.userInfo.profile)==='string'? props.userInfo.profile :imageUrl}
                     alt="profile" className="sidebar__box__user__picbox__pic" />
                 </div>
                 <p className="sidebar__box__user__text">환영합니다 <span>{'bitnaraLee1234'}</span>님</p>
             </div>
             <div className="sidebar__box__proverb">
                 <div className="sidebar__box__proverb__title">today's proverb ▶</div>
                 <div className="sidebar__box__proverb__content">
                    <p>"{props.userInfo.advice}"</p>
                    -{props.userInfo.author}- 
                 </div>
             </div>
         </div>
          
       </div>
    )

}

export default Sidebar