import React from "react";
import SearchEmotion from "./SearchEmotion";
import SendPost from "./SendPost";
import SinglePost from "./SinglePost";

function Post() {

    
 return(
     <div className="post">
         <SearchEmotion />
         <SendPost />
         {/* <SinglePost /> 를 map한다 */}
     </div>
 )
}

export default Post