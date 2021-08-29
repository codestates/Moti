import axios from "axios";
import React,{useState,useEffect,useHistory} from "react";
import SearchEmotion from "./SearchEmotion";
import SendPost from "./SendPost";
import SinglePost from "./SinglePost";

const serverurl = 'http://localhost:80';// 배포환경시 수정필요
function Post({isLogin, accessToken,accessTokenHandler}) {
    const [allpost, setAllpost] = useState(null)
    // const history = useHistory();
 //모든 포스트 요청
   
//하나의 post에 들어가는 것:picture, emotion, text, createAt
// get요청도 form-data인지, 그렇다면 form-data를 받아올때 - 일반적인 방법으로 받는것인지?

    const getAllpost = (accessToken) => {
        axios
            .get(serverurl+'/post/allposts',{
                headers: {
                    "Content-type": "multipart/form-data",// get이라서 필요없나...{'Content-Type': 'application/json'}->서버와 물어봄
                    Authorization: `Bearer ${accessToken}`
                    },
                withCredentials: true
            }) // 다시 헤더의 새 엑세스 토큰 확인
            .then((res)=>{
                if(res.headers.accessToken){
                  
                    accessTokenHandler(accessToken)

                }
                if(res.status === 200){
                   const newAllpost = res.data.AllPosts
                   setAllpost(newAllpost);
                }
                // 유효하지 않을 경우 -> 예러폐이지?
                // else{
                //     history.push('/notfound');
                // }
            })
            .catch(err => {
                console.log(err)
            })
        }
    /*최초 렌더링시 */    
    useEffect(()=>{
        getAllpost(accessToken)
    },[])    

   /* 인피니트 스크롤 구현 */
    
 return(
     <div className="post">
         <SearchEmotion />
         <SendPost accessToken={accessToken} getAllpost={getAllpost} accessTokenHandler={accessTokenHandler}/>
            {allpost ? allpost.map((post,idx) => {
                return  ( 
                    <SinglePost key={idx} {...post}/>
                    )
                })
            :
            <SinglePost />}
     </div>
 )
}

export default Post