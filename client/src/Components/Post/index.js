import axios from "axios";
import React,{useState,useEffect} from "react";
import {useHistory} from "react-router-dom";
import SearchEmotion from "./SearchEmotion";
import SendPost from "./SendPost";
import SinglePost from "./SinglePost";
import InitialSinglePost from "./InitialSinglePost";
import { Heartbeat } from 'css-spinners-react';
import dotenv from 'dotenv';
dotenv.config();

function Post({accessTokenHandler}) {
    let accessToken = JSON.parse(window.localStorage.getItem("userInfo")).accessToken;
    const [allpost, setAllpost] = useState(null);
    const [emotionState, setemotionState] = useState('');
    const [isLoding, setIsLoding] = useState(true);
    const history = useHistory();

    
     /*최초 렌더링시 */    
     useEffect(()=>{ 
        setIsLoding(true) 
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
            if(res.status === 200){ 
                setIsLoding(true)
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
            }) 
            .then((res)=>{
                if(res.headers.accessToken){
                    accessTokenHandler(accessToken)
                }
                if(res.status === 200){
                    
                    let sortAllPost =  res.data.AllPosts.sort((a,b)=> - b.id - a.id )  
                    setAllpost(sortAllPost);
                }
             
                else{
                     history.push('/notfound');
                }
                setIsLoding(false) 
            })
            .catch(err => {
                console.log(err)
            })
        }

        //새로운 전체 포스트 조회 요청
        const getAllPosts2 = (accessToken) => {
            setIsLoding(true) 
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
                    setIsLoding(false) 
                })
                .catch(err => {
                    console.log(err)
                })
        }

        //emotion tag별 포스트 조회
        const getPostsbyemotion = (emotion, accessToken) => {
            setIsLoding(true) 
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
                    setIsLoding(false) 
                })
                .catch(err => {
                    console.log(err);
                })
        }
         
 /* 로딩 중 */       
 if(isLoding){
    return <div className="post loading">
             <Heartbeat />
         </div>
 }

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
            <InitialSinglePost />}
     </div>
 )
}

export default Post