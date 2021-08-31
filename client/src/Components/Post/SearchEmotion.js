import  React  from "react";

function SearchEmotion({setemotionState}) {
    const handleSelect = (e) => {
        
        setemotionState(e.target.value);
    }

 return (
     <div className="searchemotion">
         <select className="searchemotion__box" onChange={handleSelect}>
             <option value="0" className="searchemotion__box__title">지난번 내 기분은..?</option>
             <option value="happy" className="searchemotion__box__face">amazing!</option>
             <option value="boring" className="searchemotion__box__face">meh...</option>
             <option value="so sad" className="searchemotion__box__face">so sad</option>
             <option value="angry" className="searchemotion__box__face">what the f..?</option>
         </select>
    
     </div>

 )


}

export default SearchEmotion