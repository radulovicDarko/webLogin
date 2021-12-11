import React, { useState } from "react";
import Button from "./Button";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import ReCAPTCHA from "react-google-recaptcha";

function Login({onClick,text}){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isVerified, setIsVerified] = useState(false)
  const [loginAttemptsCounter, setLoginAttemptsCounter] = useState(0)

  let navigate = useNavigate()

  function onChange(){
    setIsVerified(true);
  }

  function handleUsernameOnChange(e){
    setUsername(e.target.value);
  }

  function handlePasswordOnChange(e){
    setPassword(e.target.value);
  }

  function handleLoginAttempts(){
    if(loginAttemptsCounter === 4)
    {
      setLoginAttemptsCounter(0);
      setIsVerified(false);
      alert("Login is disabled for 30 seconds!");

      setTimeout(() => {
        setIsVerified(true);
      }, 30000);
    }
  }

    return (
        <div className="app-content">
        <div className="app-content-wrapper">
          <h1 className="form-title">{text}</h1>
          <form> 
            <div className="input-group">
              <label>Username</label>
              <input type="text" onChange={(e) => {handleUsernameOnChange(e)}} placeholder="Username"></input>
            </div>
            <div className="input-group" id="input-group-second">
              <label>Password</label>
              <input type="password" onChange={(e) => {handlePasswordOnChange(e)}} placeholder="Password"></input>
            </div>
            <ReCAPTCHA
              className="captcha"
              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
              onChange={onChange}
            />
            <Button disabled={!isVerified} onClick={() => { if(onClick(username,password)) navigate('../dashboard',{replace: true}); else { alert("Check inputs!"); setLoginAttemptsCounter(loginAttemptsCounter+1); handleLoginAttempts()} }} text={text}></Button>
          </form>
          <div className="password-recovery">
          <NavLink className="nav-item" to="/forgot-password"><li className="password-recovery">Forgot a password?</li></NavLink>
          </div>
        </div>
        </div>
    )
}

export default Login;