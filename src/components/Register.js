import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import validator from "validator";

function Register({onClick,text,checkIsMailExisting}){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  let navigate = useNavigate();

  const validateUsername = (e) => {    
    setUsername(e.target.value);
  }

  const validatePassword = (e) => {    
    setPassword(e.target.value);
  }

  const validateEmail = (e) => {    
    setEmail(e.target.value);
  }

  function handleSubmit(e){
    e.preventDefault();

    if(validator.isEmail(email) && username != '' && password != '' && password.match('(?=.{9,})(?=.*?[^\w\s])(?=.*?[0-9])(?=.*?[A-Z]).*?[a-z].*'))
    {
      if(!checkIsMailExisting(email))
      {
        onClick(username,password,email);
        navigate('../login',{ replace: true});
      }
      else alert("Email is already used!");
    }
    else alert("Check your inputs!");
  }
    return (
        <div className="app-content">
        <div className="app-content-wrapper">
          <h1 className="form-title">{text}</h1>  
          <form onSubmit={e => handleSubmit(e)}>
            <div className="input-group">
              <label>Email</label>
              <input type="email" placeholder="Email" onChange={e => validateEmail(e)} id="email"></input>
            </div>
            <div className="input-group">
              <label>Username</label>
              <input type="text" placeholder="Username" onChange={e => validateUsername(e)} id="username"></input>
            </div>
            <div className="input-group" id="input-group-second">
              <label>Password</label>
              <input type="password" placeholder="Password" onChange={e => validatePassword(e)} id="password"></input>
            </div>
            <input type="submit" className="btn" text={text}/>
          </form>
        </div>
        </div>
    )
}

export default Register;
