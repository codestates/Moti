import  React,{useState, useEffect}  from "react";

function Sidebar() {
    return (
       <div className="sidebar"> 
         <div className="sidebar__box">
             <div className="sidebar__box__userbox">
                 <img src={""} />
                 --------------------sidebar-----------------
                 <p>환영합니다 {"김유저"}님</p>
             </div>
             <div className="sidebar__box__proverb">
                 <div className="sidebar__box__proverb__title"></div>
                 <div className="sidebar__box__proverb__content">
                    <p> {"피할 수 없으면 즐겨라"} </p>
                    <p>{"- 로버트 엘리엇 -"}</p> {/* 데이터를 받을 때 말한 이가 나오는 정보를 받아서 ? */}
                 </div>
             </div>
         </div>
          
       </div>
    )

}

export default Sidebar