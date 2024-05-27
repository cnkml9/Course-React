import React, { useState } from 'react';
import notificationService from '../../Services/NotificationService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    userNameOrEmail: '',
    password: ''
  });

  const [registerData, setRegisterData] = useState({
    userName:'',
    nameSurname: '',
    email: '',
    password: '',
    passwordConfirm: '',
    roleName: 'Student'
  });

  const [accessToken, setAccessToken] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    });
  };

  function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5002/api/Auth/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        notificationService.error("Kullanıcı adı veya şifre hatalı");
        throw new Error('Login failed');
      }

      const data = await response.json();
      const decodedToken = parseJwt(data.accessToken);
      const userRole = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      localStorage.setItem('userRole', userRole);
      localStorage.setItem('accessToken', data.accessToken);
      setAccessToken(data.accessToken);

      console.log('Login successful + token value:' + localStorage.getItem("userRole"));
      window.location.href = '/CourseList';
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5002/api/Auth/Register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerData)
      });

      if (!response.ok) {
        notificationService.error("Kayıt işlemi başarısız");
        throw new Error('Registration failed');
      }

      notificationService.success("Kayıt başarılı");
      window.location.href = '/Login';
      console.log('Registration successful');
    } catch (error) {
      console.error('Registration error:', error.message);
    }
  };

  return (
    <div className="container" style={{ marginTop: 200 }}>
      <ToastContainer />
      <div className="row justify-content-center course-css">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <ul className="nav nav-tabs card-header-tabs" id="login-form" role="tablist">
                <li className="nav-item">
                  <a className="nav-link active" id="giris-tab" data-toggle="tab" href="#giris" role="tab" aria-controls="giris" aria-selected="true">Giriş yap</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" id="uye-tab" data-toggle="tab" href="#uye" role="tab" aria-controls="uye" aria-selected="false">Üye ol</a>
                </li>
              </ul>
            </div>
            <div className="card-body">
              <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="giris" role="tabpanel" aria-labelledby="giris-tab">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="userNameOrEmail">E-posta adresi veya telefon numarası</label>
                      <input type="text" className="form-control" id="userNameOrEmail" name="userNameOrEmail" value={formData.userNameOrEmail} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Şifre</label>
                      <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Giriş yap</button>
                  </form>
                  <div className="mt-3">
                    <a href="#" style={{ color: "#525f7f" }}>Yardıma ihtiyacım var</a>
                  </div>
                  <hr />
                  <p className="text-center" style={{ color: 'black' }}>Sosyal hesap ile giriş yap</p>
                  <div className="text-center social-btn">
                    <button className="btn btn-danger"><i className="fab fa-google"></i></button>
                    <button className="btn btn-dark"><i className="fab fa-apple"></i></button>
                    <button className="btn btn-primary"><i className="fab fa-facebook-f"></i></button>
                  </div>
                </div>
                <div className="tab-pane fade" id="uye" role="tabpanel" aria-labelledby="uye-tab">
                  <form onSubmit={handleSignUpSubmit}>
                    <div className="form-group">
                      <label htmlFor="nameSurname">Ad Soyad</label>
                      <input type="text" className="form-control" id="nameSurname" name="nameSurname" value={registerData.nameSurname} onChange={handleRegisterChange} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="userName">Kullanıcı Adı </label>
                      <input type="text" className="form-control" id="userName" name="userName" value={registerData.userName} onChange={handleRegisterChange} required />
                    </div>
                  
                    <div className="form-group">
                      <label htmlFor="email">E-posta adresi</label>
                      <input type="email" className="form-control" id="email" name="email" value={registerData.email} onChange={handleRegisterChange} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Şifre</label>
                      <input type="password" className="form-control" id="password" name="password" value={registerData.password} onChange={handleRegisterChange} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="passwordConfirm">Şifreyi Onayla</label>
                      <input type="password" className="form-control" id="passwordConfirm" name="passwordConfirm" value={registerData.passwordConfirm} onChange={handleRegisterChange} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="roleName">Rol Seçin</label>
                      <select className="form-control" id="roleName" name="roleName" value={registerData.roleName} onChange={handleRegisterChange} required>
                        <option value="Student">Student</option>
                        <option value="Teacher">Teacher</option>
                      </select>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Üye ol</button>
                    <hr />
                    <p className="text-center" style={{ color: 'black' }}>Sosyal hesap ile giriş yap</p>
                    <div className="text-center social-btn">
                      <button className="btn btn-danger"><i className="fab fa-google"></i></button>
                      <button className="btn btn-dark"><i className="fab fa-apple"></i></button>
                      <button className="btn btn-primary"><i className="fab fa-facebook-f"></i></button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
