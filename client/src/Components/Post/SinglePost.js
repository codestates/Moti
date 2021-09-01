import  React, { useEffect, useState }  from "react";
import { formatDistance} from 'date-fns';
import Bline from '../../assets/mypage-line.svg';
import Mline from '../../assets/mypage-midline.svg';
import trash from '../../assets/delete-trash.svg';
import { emotionList } from "./EmotionList";
const {Buffer} = require('buffer')

function SinglePost({id,picture,emotion,content,createdAt,handleDelete,allpost}) {

  const [line, setLine] = useState(true)
   const emotionUrl = emotion? emotionList.filter(emo => emo.emotion === emotion)[0].img : emotionList[0].img
   const imageUrl = picture ? 'data:image/png;base64, '+ Buffer(picture, 'binary').toString('base64') : ''

   
   const lineHandler = () => {
     if(window.innerWidth > 1024){
       setLine(true)
     }else{
       setLine(false)
     }
   }
   useEffect(()=>{
     lineHandler();
   },[])

   window.addEventListener('resize', lineHandler);
   
   
    return (
        <div className="signlepost">
          <div className="signlepost__linebox">
            <img src={line ? Bline : Mline} alt="line"/>
          </div>
            <div className="signlepost__box">
                {line ?
                    <div className="signlepost__box__circlebox">
                       <img src={emotionUrl} className="signlepost__box__circlebox__img"/>
                     </div> 
                  : 
                  null}
                 <div className="singlepost__box__right">
                   <div className="singlepost__box__right__top">
                      {!line ?
                        <div className="signlepost__box__circlebox">{/*반응형mid사이즈용 */}
                          <img src={emotionUrl} className="signlepost__box__circlebox__img"/>
                        </div>
                        :
                        null}
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
                   {imageUrl?  <div className="singlepost__box__right__photo normal">
                        <img src={imageUrl} className="signlepost__box__photo__img normal"/>
                   </div> : null}
                 </div>
               
                {imageUrl? 
                 <div className="singlepost__box__right__photo mid">{/*반응형mid사이즈용 */}
                      <img src={imageUrl} className="signlepost__box__photo__img mid"/>
                   </div> 
                   :
                   null
                }
            </div>
        </div>
   
    )
   
   
   }
   
   export default SinglePost