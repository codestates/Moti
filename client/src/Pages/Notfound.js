import React from "react";
import { Link } from 'react-router-dom';

function Notfound() {
 return(
     <div className='notfound'>
         <img src="../images/notfound-page.jpg" />
         <div className="notfound__backhome">
         <Link to="/" className="notfound__backhome__link">
          Back
        </Link>
        </div>
     </div>
 )
}

export default Notfound