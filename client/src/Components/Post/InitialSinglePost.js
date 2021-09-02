import React from "react";
import line from '../../assets/mypage-line.svg';

function InitialSinglePost(){
    return (
        <div className="signlepost">
          <div className="signlepost__linebox">
            <img src={line} alt="line"/>
          </div>
          <h1> 작성한 기록이 없습니다. </h1>
          </div>
         )

}
export default InitialSinglePost;