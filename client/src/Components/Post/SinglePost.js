import  React  from "react";
import line from '../../assets/mypage-line.svg'

function SinglePost({picture,emotion,text,creatAt}) {
  //creatAt 받아서 날짜 라이브러리
  //각자렌더링
   
    return (
        <div className="signlpost">
            <img src={line} alt="line" />
            
            <h1> 기록된 다짐이 없습니다.</h1>
        </div>
   
    )
   
   
   }
   
   export default SinglePost