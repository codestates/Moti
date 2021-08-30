import  React,{useState}  from "react";
import { useHistory } from "react-router";
import uploadImg from '../../assets/img-upload.svg';
import axios from "axios";

const serverurl = 'http://localhost:80';

function SendPost({accessToken, getAllpost, accessTokenHandler}) {
  const [text, setText] = useState('')  
  const [previewURL,setPreviwURL] = useState('')
  const [imgfile, setImgfile] = useState('');
  const [emotionstate, setEmotionstate] = useState('')
  const [content, setContent] = useState('')
  const [isActive, setIsActive] = useState(false)
  const [imgsrc,setImgsrc] = useState('')
  const history = useHistory();

  const emotionList = [
      {
        emotion : 'happy',
        img: '../images/emotion-happy.png', 
      },
      {
        emotion : 'boring',
        img: '../images/emotion-boring.png',  
      },
      {
        emotion : 'so sad',
        img: '../images/emotion-sad.png',  
      },
      {
        emotion : 'angry',
        img: '../images/emotion-angry.png',  
      }]


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
        reader.readAsDataURL(file); // blob처리필요?
    }

  /*파일 전송 */
  // 텍스트가 있는지 + 감정 선택했는지 확인, 없으면 에러메세지 //
  const submitHandle = (event) => {
      event.preventDefault();
       setContent(text)           
       if(!text || !emotionstate){
           return /*모달을 만들어 넣구 싶은데! */
       }
     
        const formData = new FormData();
        formData.append("imgfile",imgfile);
        formData.append("emotionstate",emotionstate);
        formData.append("content",content);

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
            .post(serverurl +`/post/upload`, formData, config)
                .then((res)=>{/*헤더 검사해서 새로운 액세스토큰 있는지 확인,있으면 상태변경*/
                    if(res.headers.accessToken){
                        accessTokenHandler(accessToken)
                    }
                    if(res.data.message === '업로드 성공'){ //하면 모든 포스트 불러옴
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
                   setContent('')
                })
                .catch(err => 
                    console.log(err))
    }

    /*이미지 미리보기 분기 */
    let profile_preview = null;
    if(imgfile !== ''){
      profile_preview = <img className='sendpost__box__textbox__img' src={previewURL}/>
    }
   
    return (
        <div className="sendpost">
            <div className="sendpost__wrapper">
              <div className="sendpost__circlebox">
                 {imgsrc? 
                    <img src={imgsrc} alt="face" className="sendpost__circlebox__img__active"/>
                     :
                     <div className="sendpost__circlebox__img"/>}
                 </div>
                 <div className="sendpost__circlebox__select">
                            <div className="sendpost__circlebox__select__btn" onClick={openHandler}>
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
                      onChange={(e)=>setText(e.target.value)
                     }>
                  </textarea>
                    <div className="sendpost__box__below">
                  
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
                            {/* <p>how do you feel?</p> */}
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
