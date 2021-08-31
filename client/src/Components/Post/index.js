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


     /*게시물 삭제 */
    
  
     const handleDelete = (e,idx,accessToken) => {
        e.preventDefault(); 
        axios
        .delete(process.env.REACT_APP_URL+'/post/delete',{
           post_id : idx
        },
        {
            headers: {
                "Content-Type": "multipart/form-data",
                authorization: `Bearer ${accessToken}`
                },
            withCredentials: true
        })
        .then((res)=>{
            if(res.status === 200){ //또 렌더링
                getAllpost(accessToken)  
            } else{
                history.push('/notfound');
            }
        })
        .catch(err => {
            console.log(err)
        })
    }
       

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
                   if(allpost === null){ //최초일시
                      setAllpost(res.data.AllPosts)
                   }
                   else{
                   const newAllpost = res.data.AllPosts[res.data.AllPosts.length-1]

                   setAllpost([newAllpost,...allpost]);
                   }
                // const newAllpost = res.data.AllPosts
                // setAllpost(newAllpost);
                }
                // 기존이 null일 경우 그냥 렌더링, 아닐시 마지막것을 옮겨서..
                // 유효하지 않을 경우 -> 예러폐이지
                else{
                    history.push('/notfound');
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
  
 
    //   const removePost = allpost.filter((post,index) => index !== idx)
    //   setAllpost(removePost)
   /* 인피니트 스크롤 구현 */
    
 return(
     <div className="post">
         <SearchEmotion />
         <SendPost accessToken={accessToken} getAllpost={getAllpost} accessTokenHandler={accessTokenHandler}/>
            {allpost ? allpost.map((post,idx) => {
                return  ( 
                    <SinglePost key={idx} {...post} idx={idx} handleDelete={handleDelete}/>
                    )
                })
            :
            <SinglePost allpost={allpost}/>}
     </div>
 )
}

export default Post