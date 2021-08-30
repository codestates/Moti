import  React  from "react";
import line from '../../assets/mypage-line.svg'
const {Buffer} = require('buffer')

function SinglePost({picture,emotion,content,createdAt}) {
  //creatAt 받아서 날짜 라이브러리
  //각자렌더링
   //console.log(picture,emotion,content,createdAt)
   let img;
   if(picture){
        img = 'data:image/png;base64,'+Buffer(picture, 'binary').toString("base64");
   }else{
        img = line;
   }

    return (
        <div className="signlpost">
            <img src={img} alt="" />
            
            <h3>{content}</h3>
            <h5>{emotion}</h5>
            <h6>{createdAt}</h6>
        </div>
   
    )
   
   
   }
   
   export default SinglePost