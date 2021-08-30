import axios from "axios";
import React,{useState,useEffect} from "react";
import {useHistory} from "react-router-dom";
import SearchEmotion from "./SearchEmotion";
import SendPost from "./SendPost";
import SinglePost from "./SinglePost";

function Post({accessTokenHandler}) {
    let accessToken = JSON.parse(window.localStorage.getItem("userInfo")).accessToken;
    const [allpost, setAllpost] = useState(null)
    const history = useHistory();

    
     /*최초 렌더링시 */    
     useEffect(()=>{
        getAllpost(accessToken)
    },[])   

    //모든 포스트 요청
   
    const getAllpost = (accessToken) => {
        axios
            .get(process.env.REACT_APP_URL+'/post/allposts',{
                headers: {
                    "Content-Type": "multipart/form-data",
                    authorization: `Bearer ${accessToken}`
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
                // 유효하지 않을 경우 -> 예러폐이지
                else{
                    history.push('/notfound');
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
  

     /*게시물 삭제 */

  
     const handleDelete = (e,idx) => {
        e.preventDefault(); 
        const removePost = allpost.filter((post,index) => index !== idx)
        setAllpost(removePost)
      }


   /* 인피니트 스크롤 구현 */
    
 return(
     <div className="post">
         <SearchEmotion accessToken={accessToken} accessTokenHandler={accessTokenHandler}/>
         <SendPost accessToken={accessToken} getAllpost={getAllpost} accessTokenHandler={accessTokenHandler}/>
            {allpost ? allpost.map((post,idx) => {
                return  ( 
                    <SinglePost key={idx} {...post} idx={idx} handleDelete={handleDelete}/>
                    )
                })
            :
            <SinglePost />}
     </div>
 )
}

export default Post