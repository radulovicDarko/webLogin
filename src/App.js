import './App.css';
import { NavLink } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from './components/Register';
import { useState,useEffect } from 'react';
import ForgotPassword from './components/ForgotPassword';
import NewPassword from './components/NewPassword';
import Dashboard from "./components/Dashboard"
import bcrypt from 'bcryptjs'

function App() {
  const [isActive, setIsActive] = useState();
  const [users, setUsers] = useState([]);
  const salt = bcrypt.genSaltSync(10);
  const [verificationCode, setVerificationCode] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isLogged, setIsLogged] = useState(false)

  function updateVerificationCode(code){
    setVerificationCode(code);
  }

  function setMail(email){
    setUserEmail(email);
  }

  function getUsers() {
    fetch('http://localhost:3001')
      .then(response => {
        return response.json();
      })
      .then(data => {
        setUsers(data);
      });
  }
  
  useEffect(() => {
    getUsers();
    setIsLogged(sessionStorage.getItem('user') ? true : false)
  }, []);

  function handleLogin(username, password){
    let valid = false;
    var temp = 1;

    users.forEach(user => {
      if(bcrypt.compareSync(password,user.password) && user.username === username && temp == 1)
      {
        valid = true;
        temp++;
        sessionStorage.setItem('user',user.username)
        setIsLogged(true);
      }
    });
      return valid;
  }

  function handleLogOut() {
    sessionStorage.removeItem('user');
    setIsLogged(false);
  }

  function checkIsMailExisting(email){
    let valid = false;
    var temp = 1;

    users.forEach(user => {
      if(user.email === email && temp == 1)
      {
        valid = true;
        temp++;
      }
    });
      return valid;
  }
  
  function createUser(username,password,email) {
    const hashedPassword = bcrypt.hashSync(password,salt);

    fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, hashedPassword, email}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert("User "+ username + " has been created successfully!");
        getUsers();
      });
  }

  function updateUser(password,code) {
    const hashedPassword = bcrypt.hashSync(password,salt);

    if(verificationCode == code)
    {
      fetch('http://localhost:3001/users/'+userEmail, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({hashedPassword , userEmail}),
      })
        .then(response => {
          return response.text();
        })
        .then(data => {
          alert("User with email "+ userEmail + " has been updated successfully!");
          getUsers();
        });
        return true;
    }
    else
    alert("Check your verification code!");
    return false;
  }

  function toggleIsActive(){
    setIsActive(false);
  }

  return (
    <BrowserRouter>
      <div className="container">
        <div className="App">
          <div className="app-header">
            <div className="nav-items">
              <ul className="nav-item-wrapper">
              <NavLink activeClassName="active" className={`${ isActive ? 'nav-item active' : 'nav-item' }`} to="/login"><li className="nav-item" onClick={toggleIsActive}>Login</li></NavLink>
              <NavLink activeClassName="active" className="nav-item" to="/register"><li onClick={toggleIsActive} className="nav-item">Register</li></NavLink>
              </ul>
              <Routes>
                <Route path="/" element={isLogged ? <Dashboard text='Dashboard' handleLogOut={handleLogOut}/> : <Login onClick={handleLogin} text="LOGIN" />} />
                <Route path="login" element={isLogged ? <Dashboard text='Dashboard' handleLogOut={handleLogOut}/> : <Login onClick={handleLogin} text="LOGIN" />} />
                <Route path="register" element={<Register onClick={createUser} text="REGISTER" checkIsMailExisting={checkIsMailExisting} />} />
                <Route path="forgot-password" element={<ForgotPassword text="SEND MAIL" checkIsMailExisting={checkIsMailExisting} updateVerificationCode={updateVerificationCode} setMail={setMail} />} />
                <Route path="new-password" element={<NewPassword onClick={updateUser} text="CHANGE PASSWORD" />} />
                <Route path="dashboard" element={isLogged ? <Dashboard text='Dashboard' handleLogOut={handleLogOut}/> : <Login onClick={handleLogin} text="LOGIN" />} />
                <Route path="/**" element={<Login onClick={handleLogin} text='LOGIN'/>} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
