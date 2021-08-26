import  React  from "react";

function Footer() {
    return (
       <div className="footer">
           <div className="footer__container">
               <ul className="footer__container__Linkbox">
                  <li className="footer__container__Linkbox_item">
                      --------------------여기는 footer---------------------------
                     Link
                  </li>
                  <li className="footer__container__Linkbox_item">
                     Home
                  </li>
                  <li className="footer__container__Linkbox_item">
                     Mypage
                 </li>
                  <li className="footer__container__Linkbox_item">
                     Logout
                 </li>
                 <li className="footer__container__Linkbox_item">
                     Github
                 </li>
               </ul>
               <div className="footer__container__motibox">
                   <div>Moti</div>
                    <p>
                      Designed and built with all the love 
                      in the Codestates  by the MotiMoti team
                    </p>
                    <p>
                      Copyright 2021. Team MotiMoti.
                      All right reserved.
                    </p>
               </div>
 
           </div>
       </div>
    )

}

export default Footer