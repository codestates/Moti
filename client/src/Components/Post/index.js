import axios from "axios";
import React,{useState,useEffect} from "react";
import {useHistory} from "react-router-dom";
import SearchEmotion from "./SearchEmotion";
import SendPost from "./SendPost";
import SinglePost from "./SinglePost";
import dotenv from 'dotenv';
dotenv.config();

function Post({accessTokenHandler}) {
    let accessToken = JSON.parse(window.localStorage.getItem("userInfo")).accessToken;
    const [allpost, setAllpost] = useState(null);
    const [emotionState, setemotionState] = useState('');
    const history = useHistory();

    
     /*최초 렌더링시 */    
     useEffect(()=>{ 
        getAllpost(accessToken)
    },[])   

    useEffect(() => {
        if(emotionState === "0"){
            getAllPosts2(accessToken)
        }else{
           getPostsbyemotion(emotionState, accessToken) 
        }
    }, [emotionState])


     /*게시물 삭제 */
    
  
     const handleDelete = (e,id) => {
        e.preventDefault(); 
        axios
        .delete(process.env.REACT_APP_URL+'/post/delete', {
            headers : {
                authorization: `Bearer ${accessToken}`
            },
            data: {
                post_id : id
            }
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
                    let sortAllPost =  res.data.AllPosts.sort((a,b)=> - b.id - a.id )  
                    setAllpost(sortAllPost);
                    }

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

        //새로운 전체 포스트 조회 요청
        const getAllPosts2 = (accessToken) => {
            axios
                .get(process.env.REACT_APP_URL+'/post/allposts',{
                    headers: {
                        "Content-Type": "multipart/form-data",
                        authorization: `Bearer ${accessToken}`
                        },
                    withCredentials: true
                })
                .then((res) => {
                    if(res.headers.accessToken){
                        accessTokenHandler(accessToken)

                    }

                    if(res.status === 200){
                        setAllpost(res.data.AllPosts)
                    }else{
                        history.push('/notfound');
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }

        //emotion tag별 포스트 조회
        const getPostsbyemotion = (emotion, accessToken) => {
            axios
                .get(process.env.REACT_APP_URL+`/post/posts/${emotion}`,{
                    headers :{
                        "Content-Type": "multipart/form-data",
                        authorization: `Bearer ${accessToken}`
                    },
                    withCredentials : true
                })
                .then((res) => {
                    if(res.headers.accessToken){
                        accessTokenHandler(accessToken)
                    }

                    if(res.status === 200){
                        setAllpost(res.data.emotionPosts)
                    }else{
                        history.push('/notfound');
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
  
 
    //   const removePost = allpost.filter((post,index) => index !== idx)
    //   setAllpost(removePost)
   /* 인피니트 스크롤 구현 */
    
 return(
     <div className="post">
         <SearchEmotion setemotionState = {setemotionState} />
         <SendPost accessToken={accessToken} getAllpost={getAllpost} accessTokenHandler={accessTokenHandler}/>
            {allpost ? allpost.map((post,idx) => {
                return  ( 
                    <SinglePost key={idx} {...post}  handleDelete={handleDelete}/>
                    )
                })
            :
            <InitialSinglePost/>}
     </div>
 )
}

export default Post