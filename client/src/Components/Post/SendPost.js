import  React,{useState}  from "react";
import { useHistory } from "react-router";
import uploadImg from '../../assets/img-upload.svg';
import axios from "axios";
import { emotionList } from "./EmotionList";
import dotenv from 'dotenv';
dotenv.config();

const serverurl = process.env.REACT_APP_URL;

function SendPost({getAllpost, accessTokenHandler}) {
  const [text, setText] = useState('')  
  const [previewURL,setPreviwURL] = useState('')
  const [imgfile, setImgfile] = useState('');
  const [emotionstate, setEmotionstate] = useState('')
  const [isActive, setIsActive] = useState(false)
  const [imgsrc,setImgsrc] = useState('')
  const [errMesage,setErrMessage] = useState(false)
  let accessToken = JSON.parse(window.localStorage.getItem("userInfo")).accessToken;
  const history = useHistory();


 /*감정 선택 */
 const openHandler = (e) =>{
    e.preventDefault(); 
    setIsActive(!isActive)
 }
/*감정 상태 저장 함수*/
 const emotionHandler = (e,idx) => {
    e.preventDefault(); 

    setEmotionstate(emotionList[idx].emotion) 
    setImgsrc(emotionList[idx].img)
   
    setIsActive(false)
    console.log(emotionstate,text,isActive) 
   
 } 

 /*유효성체크 */

 const validationCheck = () => {
   return
 }
 /*미리보기 + onChange 이벤트 */
  const fileUploadHandler = (e) => {
     e.preventDefault(); 

        let reader = new FileReader();
        let file = e.target.files[0]; 
        console.log(file)
        reader.onloadend = () => {
            setImgfile(file)
            setPreviwURL(reader.result)
        } 
        reader.readAsDataURL(file); 
    }

  /*파일 전송 */

  const submitHandle = (event) => {
      event.preventDefault();
   
       if(!text || !emotionstate){
           setErrMessage(true)
           return 
       }
     
        const formData = new FormData();
        formData.append("picture",imgfile);
        formData.append("emotionstate",emotionstate);
        formData.append("content",text);

       for(let key of formData.entries()){
        console.log(`${key}`)
       }
        const config = {
            headers: {
                "content-type": "multipart/form-data",
                authorization: `Bearer ${accessToken}`
                },
            withCredentials: true
            };

            axios
            .post(process.env.REACT_APP_URL +`/post/upload`, formData, config)
                .then((res)=>{
                    if(res.headers.accessToken){
                        accessTokenHandler(accessToken)
                    }
                    if(res.data.message === '업로드 성공'){ 
                        getAllpost(accessToken)
                    }
                    // 유효하지 않을 경우
                    else{
                        history.push('/notfound');
                    }
                })
                .then(res => {
                   setText('')
                   setPreviwURL('')
                   setImgfile('')
                   setEmotionstate('')
                   setErrMessage(false)
                })
                .catch(err => 
                    console.log(err))
    }

    /* 사진 삭제 */
    const deleteHandler = () => {
        setImgfile('')
        setPreviwURL('')
    }

    /*이미지 미리보기 분기 */
    let profile_preview = null;
    if(imgfile !== ''){
      profile_preview = <img className='sendpost__box__leftbox__preivew__img' src={previewURL}/>
      
    }
 
   
    return (
        <div className="sendpost">
            <div className="sendpost__wrapper">
              <div className="sendpost__circlebox">
                 {imgsrc && emotionstate? 
                    <img src={imgsrc} alt="face" className="sendpost__circlebox__img__active"/>
                     :
                     <div className="sendpost__circlebox__img"/>}
                 </div>
                 <div className="sendpost__circlebox__select">
                            <div className="sendpost__circlebox__select__btn" onClick={openHandler}  onBlur={validationCheck()}>
                            {emotionstate? emotionstate :'Choice!'}
                            </div>
                                {isActive? 
                                 <ul className='sendpost__circlebox__select__ul'>
                                  { 
                                  emotionList.map((emotion,idx)=>{
                                       return (
                                       <li key={idx} value={emotion.emotion} onClick={(e)=>emotionHandler(e,idx)}>
                                           <img src={emotion.img} alt={emotion.emotion} />
                                       </li>)
                                    })
                                   } 
                                </ul>
                                : null
                                }
                            </div>
                </div>
              <div className="sendpost__box">
                  <textarea 
                     value={text} 
                      placeholder="How are you today?"
                      className="sendpost__box__textbox" 
                      onChange={(e)=>
                          setText(e.target.value)
                     }
                     onBlur={validationCheck()}
                     >
                  </textarea>
                    <div className="sendpost__box__below">
                      <div className={errMesage? "sensendpost__box__below__error error" : "sensendpost__box__below__error hide"} >
                         오늘의 기분 선택과 글 작성을 완료해주세요.
                          </div>
                        <div className="sendpost__box__below__leftbox">
                            <input type="file" 
                                id="upload" 
                                 accept="image/*"
                                 name="file" 
                                 multiple="multiple" 
                                 onChange={fileUploadHandler}/>
                            
                            <label htmlfor="upload">
                           select your photo 
                            </label>
                            <img src={uploadImg} alt="upload" />
                            {profile_preview}
                            {profile_preview ?
          
                                <button className="sendpost__box__below__leftbox__delete" onClick={deleteHandler}
                                    >&times;
                                  </button>
                                
                                  :
                                  null}
                               
                        </div>
                       <button className="sendpost__box__below__btn" 
                            onClick={(event)=>submitHandle(event)
                            }> 
                            Send 
                        </button>
                    </div>
                </div>
        </div>
   
    )
   
   }
   
   export default SendPost
