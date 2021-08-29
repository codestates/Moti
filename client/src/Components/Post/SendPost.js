import  React,{useState,useHistory}  from "react";
import uploadImg from '../../assets/upload-img.svg';
import axios from "axios";

const serverurl = 'http://localhost:80';

function SendPost({accessToken, getAllpost, accessTokenHandler}) {
  const [text, setText] = useState('')  
  const [previewURL,setPreviwURL] = useState('')
  const [imgfile, setImgfile] = useState('');
  const [emotionstate, setEmotionstate] = useState('')
  const [content, setContent] = useState('')
  const [isActive, setIsActive] = useState(false)
//   const history = useHistory();

//   const [sendPost, setSendPost] = useState({
//       previewURL:'',
//   })
  const emotions = ['happy','boring','so sad', 'what the..f?!!','somthing else?'] 

 /*감정 선택 */
 const openHandler = (e) =>{
    e.preventDefault(); 
    setIsActive(!isActive)
 }
 // 선택하면 리스트들이 보이고, 선택한 리스트로 상태변경, 선택한 것이 버튼칸에 렌더링(글씨지워짐) 그리고 창 안보임


 const emotionHandler = (e,idx) => {/*임시 감정 상태 저장 함수*/
    e.preventDefault(); 

    setEmotionstate(emotions[idx]) 
   
    setIsActive(false)
    console.log(emotionstate,text,isActive) // 선택한 감정이 렌더링되게 
   
 } 


 /*미리보기 + onChange 이벤트 */
  const fileUploadHandler = (e) => {
     e.preventDefault(); 

        let reader = new FileReader();
        let file = e.target.files[0]; 
        console.log(file)
        reader.onloadend = () => {//reader.onloadend가 바로 파일 업로드 작업이 끝났을 때 실행되도록 해줍니다.
            setImgfile(file)
            setPreviwURL(reader.result)//FileReader.result는 파일 업로드 작업이 완료된 후 실행되며 파일의 컨텐츠에 접근할 수 있습니다.
        } 
        reader.readAsDataURL(file); // blob처리필요
    }

  /*파일 전송 */
  // 텍스트가 있는지 + 감정 선택했는지 확인, 없으면 에러메세지 //
  const submitHandle = (event) => {
      event.preventDefault();
       setContent(text)           
    //    if(!text || !emotionstate){
    //        return /*모달을 만들어 넣구 싶은데! */
    //    }
     
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
                Authorization: `Bearer ${accessToken}`
                },
            withCredentials: true
            };

            axios
            .post(serverurl +`/post/upload`, formData, config)
                .then((res)=>{/*헤더 검사해서 새로운 액세스토큰 있는지 확인,있으면 상태변경*/
                    if(res.headers.accessToken){
                        /*서버랑 물어보기..이름 accessToken으로 설정되있는지 */
                        accessTokenHandler(accessToken)
                    }
                    if(res.data.message === '업로드 성공'){ //하면 모든 포스트 불러옴
                        getAllpost(accessToken)
                    }
                    // 유효하지 않을 경우
                    // else{
                    //     history.push('/notfound');
                    // }
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
   
    // const options = [<img src={uploadImg} alt="upload" />,<img src={uploadImg} alt="upload" />,<img src={uploadImg} alt="upload" />]

    return (
        <div className="sendpost">
            <div className="sendpost__"></div>
              <div className="sendpost__circlebox">
                 <div className="sendpost__circlebox__img"/>
              </div>
              <div className="sendpost__circlebox__select">
                                <div className="sendpost__circlebox__select__btn" onClick={openHandler}>
                                    {emotionstate? emotionstate :'Choice!'}
                                </div>
                                 {isActive? <ul className='sendpost__circlebox__select__ul'>
                                  { emotions.map((emotion,idx)=>{
                                       return <li key={idx} value={emotion} onClick={(e)=>emotionHandler(e,idx)}/>
                                    })
                                 } 
                                </ul>
                                : null}
                            </div>
              <div className="sendpost__box">
                  <textarea value={text} placeholder="How are you today?" className="sendpost__box__textbox" onChange={(e)=>setText(e.target.value)}>
                    </textarea>
                    <div className="sendpost__box__below">
                  
                        <div className="sendpost__box__below__leftbox">
                            {profile_preview}{/*미리보기기능 임시 렌더링 */}  
                            <input type="file" id="upload" accept="image/*" name="file" multiple="multiple" onChange={fileUploadHandler}/>
                            <img src={uploadImg} alt="upload" />
                            <label htmlfor="upload">
                           select your photo 
                            </label>

                            {/* 클릭됬으면 렌더링 or not? 옵션클릭후 전달되며 클릭값 다시 false
                            <select>
                                <option value="happy" onClick={(e)=>emotionHandler(e)}>!</option>
                                <option value="1">a..!</option>
                                <option value="2">meh...</option>
                                <option value="3">so sad</option>
                                <option value="4">...?</option>
                            </select> */}
                            
                            <p>how do you feel?</p>
                        </div>
                       <button className="sendpost__box__below__btn" onClick={(event)=>submitHandle(event)}> Send </button>
                    </div>
                </div>
        </div>
   
    )
   
   }
   
   export default SendPost

              {/* <input
  id="upload-file"
  type="file"
  accept="image/*, video/*"
  multiple
//   onChange={uploadFile}
></input>
<label htmlFor="upload-file">파일선택</label> */}

/*https://cookinghoil.tistory.com/114 */     

{/* { options.map((option,idx) => {
                                  return  
                                    ( <ul>
                                        <li>
                                            <option key={idx} onClick={()=>emotionHandler(option)}>{option}</option>
                                        </li> 
                                    </ul>
                                    )
                              })
                              } */}