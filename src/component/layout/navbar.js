// Navbar.js

import React, { useState, useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom';


const Navbar = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const role = localStorage.getItem('userRole');
    setRole(role);

    setIsLoggedIn(token !== null);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userRole');

    setIsLoggedIn(false);
  };

    const navigate = useNavigate();

    const routeChange = (getPath) => {
      navigate(getPath);
    };
  

  return (
    <div class="super_container" style={{marginBottom:'200px'}}>

    <header class="header trans_300">

   

      <div class="main_nav_container">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 text-right">
              <div class="logo_container">
                <a href="#">Kurs<span>Yönetim</span></a>
              </div>
              <nav class="navbar">
                
              <ul className='navbar_menu'> 
            <li><Link to="/courselist">Anasayfa</Link></li>
            {isLoggedIn ? (
              <>
                <li><Link to="/courselist">Tüm Kurslar</Link></li>
                {role === 'Teacher' && <li><Link to="/createcourse">Kurs Oluştur</Link></li>}
                {role === 'Teacher' && <li><Link to="/courselistbyteacher">Kurslarım</Link></li>}
                {role === 'Student' && <li><Link to="/mycourselist">Kurslarım</Link></li>}
                <li><Link to='/Login' onClick={handleLogout}>Çıkış Yap</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/login">Giriş Yap</Link></li>
              </>
            )}
          </ul>
                <ul class="navbar_user">
                  <li>
                    <a href="#"
                      ><i class="fa fa-search" aria-hidden="true"></i
                    ></a>
                  </li>
                  <li>
                    <a href=""  onClick={() => routeChange('/login')}
                      ><i class="fa fa-user" aria-hidden="true" ></i
                    ></a>
                  </li>
                  <li class="checkout"></li>
                </ul>
            
                <div class="hamburger_container">
                  <i class="fa fa-bars" aria-hidden="true"></i>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="fs_menu_overlay"></div>
    <div class="hamburger_menu">
      <div class="hamburger_close">
        <i class="fa fa-times" aria-hidden="true"></i>
      </div>
      <div class="hamburger_menu_content text-right">
        <ul class="menu_top_nav">
          <li class="menu_item has-children">
            <a href="#">
              usd
              <i class="fa fa-angle-down"></i>
            </a>
            <ul class="menu_selection">
              <li><a href="#">cad</a></li>
              <li><a href="#">aud</a></li>
              <li><a href="#">eur</a></li>
              <li><a href="#">gbp</a></li>
            </ul>
          </li>
          <li class="menu_item has-children">
            <a href="#">
              English
              <i class="fa fa-angle-down"></i>
            </a>
            <ul class="menu_selection">
              <li><a href="#">French</a></li>
              <li><a href="#">Italian</a></li>
              <li><a href="#">German</a></li>
              <li><a href="#">Spanish</a></li>
            </ul>
          </li>
          <li class="menu_item has-children">
            <a href="#">
              My Account
              <i class="fa fa-angle-down"></i>
            </a>
            <ul class="menu_selection">
              <li>
                <a href="#"
                  ><i class="fa fa-sign-in" aria-hidden="true"></i>Sign In</a
                >
              </li>
              <li>
                <a href="#"
                  ><i class="fa fa-user-plus" aria-hidden="true"></i
                  >Register</a
                >
              </li>
            </ul>
          </li>
          <li class="menu_item"><a href="#">home</a></li>
          <li class="menu_item"><a href="#">shop</a></li>
          <li class="menu_item"><a href="#">promotion</a></li>
          <li class="menu_item"><a href="#">pages</a></li>
          <li class="menu_item"><a href="#">blog</a></li>
          <li class="menu_item"><a href="#">contact</a></li>
        </ul>
      </div>
    </div>
  </div>
  );
}

export default Navbar;
