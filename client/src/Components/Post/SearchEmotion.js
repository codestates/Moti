import  React  from "react";
import SinglePost from "./SinglePost";

function SearchEmotion({accessToken, accessTokenHandler}) {
    const [emotionPosts, setemotionPosts] = useState(null);

 return (
     <div className="searchemotion">
         <select className="searchemotion__box">
             <option value="0" className="searchemotion__box__title">지난번 내 기분은..?</option>
             <option value="1" className="searchemotion__box__face">amazing!</option>
             <option value="2" className="searchemotion__box__face">meh...</option>
             <option value="3" className="searchemotion__box__face">so sad</option>
             <option value="4" className="searchemotion__box__face">what the f..?</option>
         </select>
    
     </div>

 )


}

export default SearchEmotion