import { React, useState } from "react";
import emailjs from "emailjs-com"
import validator from "validator";
import { useNavigate } from "react-router";

function ForgotPassword({text,checkIsMailExisting,updateVerificationCode,setMail}){
    let navigate = useNavigate();

    const code = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    const [emailError, setEmailError] = useState(false);
    const [email, setEmail] = useState('');

    const validateEmail = (e) => {    
      if (validator.isEmail(e.target.value)) {
        setEmailError(true);
      } else {
        setEmailError(false);
      }
      setEmail(e.target.value);
    }

    function sendEmail(e) {
      e.preventDefault();

      if(checkIsMailExisting(email)) 
      {
        emailError ? 
          emailjs.sendForm('webLogin', 'weblogin', e.target, 'user_nWIBlfjyw0oeRtKc4e5ed')
            .then((result) => {
                alert('Message sent successfully! Mail with verification code is sent to your email.');
                updateVerificationCode(code);
                setMail(email);
                navigate('../new-password',{ replace: true})
              })
              : alert("Insert valid mail!");
      }
      else
        alert("There is no user with given email!");
    }

    return (
        <div className="app-content">
        <div className="app-content-wrapper">
          <h1 className="form-title">Enter your email</h1>
          <form onSubmit={(e) => sendEmail(e)}>
            <div className="input-group">
              <label>Email</label>
              <input type="text" id="userEmail" onChange={(e) => validateEmail(e)} placeholder="Email" name='toMail'></input>
              <span className='invalid'>{emailError ? '' :'Enter valid mail'}</span>
              <input type="hidden" placeholder="Email" name='code' value={code}></input>
            </div>
            <input type="submit" className="btn" value={text}></input>
          </form> 
        </div>
        </div>
    );
}

export default ForgotPassword;