import  React  from "react";
import { formatDistance, subDays } from 'date-fns';
import line from '../../assets/mypage-line.svg';
import { emotionList } from "./EmotionList";
import {Buffer} from 'buffer';

function SinglePost({idx,picture,emotion,content,createdAt,handleDelete}) {
 
  
   console.log(picture,emotion,content,createdAt)

 
  
   const emotionUrl = emotion? emotionList.filter(emo => emo.emotion === emotion)[0].img : emotionList[0].img
   const imageUrl = picture ? 'data:image/png;base64, '+ Buffer(picture, 'binary').toString('base64') : ''


   
    return (
        <div className="signlepost">
         
          <div className="signlepost__linebox">
            <img src={line} alt="line"/>
          </div>
           {!content? 
             <h1> 기록된 다짐이 없습니다.</h1> 
             :
            <div className="signlepost__box">
                <div className="signlepost__box__circlebox">
                     <img src={emotionUrl} className="signlepost__box__circlebox__img"/>
                 </div>
                 <div className="singlepost__box__right">
                   <div className="singlepost__box__right__top">
                      <div className="singlepost__box__right__top__title">
                          <div className="singlepost__box__right__top__date">
                            {formatDistance((new Date()), new Date(), { addSuffix: true })}
                          </div>
                            <div className="singlepost__box__right__top__text">
                              {content}
                            </div>
                      </div>  
                        <div className="singlepost__box__right__trashbox">
                         <img 
                          src="https://img.icons8.com/material-outlined/24/000000/trash--v1.png" 
                          className="singlepost__box__right__trash"
                          onClick={(e)=>handleDelete(e,idx)}/>
                        </div>
                   </div>
                   <div className="singlepost__box__right__photo">
                        <img src={imageUrl} className="signlepost__box__photo__img"/>
                   </div>
                 </div>

            </div>
            } 
        </div>
   
    )
   
   
   }
   
   export default SinglePost