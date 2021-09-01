import  React  from "react";

function SearchEmotion({emotionState, setemotionState}) {
    const handleSelect = (e) => {
        
        setemotionState(e.target.value);
    }

 return (
     <div className="searchemotion">
         <select className="searchemotion__box" onChange={handleSelect}>
             <option value="0" className="searchemotion__box__title" selected={emotionState==="0"? 'selected':''}>지난번 내 기분은..?</option>
             <option value="happy" className="searchemotion__box__face" selected={emotionState==="happy"? 'selected':''}>amazing!</option>
             <option value="boring" className="searchemotion__box__face" selected={emotionState==="boring"? 'selected':''}>meh...</option>
             <option value="so sad" className="searchemotion__box__face" selected={emotionState==="so sad"? 'selected':''}>so sad</option>
             <option value="angry" className="searchemotion__box__face" selected={emotionState==="angry"? 'selected':''}>what the f..?</option>
         </select>
    
     </div>

 )


}

export default SearchEmotion