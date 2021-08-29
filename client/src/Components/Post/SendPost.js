import  React,{useState}  from "react";
import uploadImg from '../../assets/upload-img.svg';
import axios from "axios";

const serverurl = 'http://localhost:80';

function SendPost() {
  const [previewURL,setPreviwURL] = useState('')
  const [imgfile, setImgfile] = useState(null);
  const [text,setText] = useState('How are you today?')

 /*미리보기 + onChange 이벤트 */
  const fileUploadHandler = (event) => {
     event.preventDefault(); 

        const reader = new FileReader();
        const file = event.target.files[0]; /*multiple? */
        console.log(file)
        reader.onloadend = () => {//reader.onloadend가 바로 파일 업로드 작업이 끝났을 때 실행되도록 해줍니다.
            setPreviwURL(reader.result)//FileReader.result는 파일 업로드 작업이 완료된 후 실행되며 파일의 컨텐츠에 접근할 수 있습니다.
            setImgfile(file)
        } 
        reader.readAsDataURL(file);
    }

  /*파일 전송 */
  const submitHandle = async(event) => {
      event.preventDefault();

        const formData = new FormData();
        formData.append(
        "upload",
        imgfile,
        // imgfile.name
        );
        const config = {
        headers: {
            "content-type": "multipart/form-data"
        }
        };
       await axios.post(serverurl +`/post/upload`, formData, config);/*임시, 수정 + access_token, emotionstate, content */
    }

    /*이미지 미리보기 분기 */
    let profile_preview = null;
    if(imgfile !== ''){
      profile_preview = <img className='profile_preview' src={previewURL}></img>
    }
   

    return (
        <div className="sendpost">
              <div className="sendpost__circlebox">
                 <div className="sendpost__circlebox__img"/>
              </div>
              <div className="sendpost__box">
                  <textarea value={text} className="sendpost__box__textbox" onChange={(e)=>setText(e.target.value)}>
                      {profile_preview}
                    </textarea>
                    <div className="sendpost__box__below">
                        <div className="sendpost__box__below__leftbox">
                            <input type="file" id="upload" accept="image/*" name="file" multiple="multiple" onchange={fileUploadHandler}/>
                            <img src={uploadImg} alt="upload" />
                            <label htmlfor="upload">
                                select your photo
                            </label>

                            {/* <div>
                                <div>
                                </div>   
                               <ul>
                                  <li>.</li> 
                                  <li>.</li> 
                                  <li>.</li> 
                                  <li>!</li> 
                                  <li>!</li> 
                              </ul> 
                            </div> */}

                            <select>
                                <option value="0"> </option>
                                <option value="1">a..!</option>
                                <option value="2">meh...</option>
                                <option value="3">so sad</option>
                                <option value="4">...?</option>
                            </select>
                            
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