import  React  from "react";
import { Link } from 'react-router-dom';
import moti from '../assets/moti.svg';
import search from '../assets/search.svg';

function Header() {
    return (
       <div className="header"> 
         <div className="header__container">
            <Link to='/mypage' className="header__container__logo">
                <img src={moti} alt={moti}/>
            </Link>
                {/* <div className="haeder__icon">
                      <i className={click? "fas fa-times" : "fas fa-bars"}/>
                    </div>
                     <ul className={click? "header__menu active" : "header__menu"}> */} {/* 반응형 haeder를 위한 구상*/}
                 <ul className="header__container__menu">
                    <li className="header__container__menu__item">
                       <Link to='/dashboard'>
                       <img src={search} alt={search}/>
                       </Link>
                    </li>
                    <li className="header__container__menu__item">
                        <Link to='/mypage' className="header__container__menu__item__profilebox">
                          <img src={""} alt="profile" className="header__container__menu__item__profilebox__profile" />
                        </Link>
                    </li>
                    <li className="header__container__menu__item">
                       <img src="https://img.icons8.com/material/50/000000/616B7C/settings--v5.png" className="header__container__menu__item__setting"/>
                    </li>
                </ul>
          </div>
       </div>
    )

}

export default Header