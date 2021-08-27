import  React,{ useState, useEffect}  from "react";


function Sidebar(props) {
    const [ advice, setAdvice] = useState("")
    const [ profile, setProfile] = useState("")
  
    // useEffect(()=>{
    // },[])  props로 받아온 프로필사진과 어드바이스,(+저자) 렌더링-> 늘 로그인되있을 것이므로 useEffect 필요 없다?
 

    return (
       <div className="sidebar"> 
         <div className="sidebar__box">
             <div className="sidebar__box__user">
                 <div className="sidebar__box__user__picbox">
                    <img src={""} alt={""} className="sidebar__box__user__picbox__pic"/>
                 </div>
                 <p className="sidebar__box__user__text">환영합니다 <span>{"김유저"}</span>님</p>
             </div>
             <div className="sidebar__box__proverb">
                 <div className="sidebar__box__proverb__title">today's proverb ▶</div>
                 <div className="sidebar__box__proverb__content">
                    <p>"{"먹고 싶은것을 다 먹는 것은 그렇게 재미있지 않다 . 인생을 경계선 없이 살면 기쁨이 덜하다 . 먹고싶은대로 다 먹을 수있다면 먹고싶은 것을 먹는데 무슨 재미가 있겠나"}"</p>
                    -{"톰행크스"}- 
                 </div>
             </div>
         </div>
          
       </div>
    )

}

export default Sidebar