import  React  from "react";
import { formatDistance, subDays } from 'date-fns';
import line from '../../assets/mypage-line.svg';
import trash from '../../assets/delete-trash.svg';
import { emotionList } from "./EmotionList";
const {Buffer} = require('buffer')

function SinglePost({id,picture,emotion,content,createdAt,handleDelete,allpost}) {
  //creatAt 받아서 날짜 라이브러리
  //각자렌더링
   console.log(id,picture,emotion,content,createdAt)

 
   const emotionUrl = emotion? emotionList.filter(emo => emo.emotion === emotion)[0].img : emotionList[0].img
   const imageUrl = picture ? 'data:image/png;base64, '+ Buffer(picture, 'binary').toString('base64') : ''
   console.log(imageUrl)
   //상태로 조회하자 
   
    return (
        <div className="signlepost">
         
          <div className="signlepost__linebox">
            <img src={line} alt="line"/>
          </div>
            <div className="signlepost__box">
                <div className="signlepost__box__circlebox">
                     <img src={emotionUrl} className="signlepost__box__circlebox__img"/>
                 </div>
                 <div className="singlepost__box__right">
                   <div className="singlepost__box__right__top">
                      <div className="singlepost__box__right__top__title">
                          <div className="singlepost__box__right__top__date">
                            {formatDistance((new Date(`${createdAt}`)), new Date(), { addSuffix: true })}
                          </div>
                            <div className="singlepost__box__right__top__text">
                              {content}
                            </div>
                      </div>  
                        <div className="singlepost__box__right__trashbox">
                         <img 
                          src={trash} 
                          className="singlepost__box__right__trash"
                          onClick={(e)=>handleDelete(e,id)}/>
                        </div>
                   </div>
                   {imageUrl?  <div className="singlepost__box__right__photo">
                        <img src={imageUrl} className="signlepost__box__photo__img"/>
                   </div> : null}
                  
                 </div>

            </div>
        </div>
   
    )
   
   
   }
   
   export default SinglePost