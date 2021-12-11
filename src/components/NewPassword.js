import React, { useState } from "react";
import { useNavigate } from "react-router";
import Button from "./Button";

function NewPassword({onClick,text}){
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeated, setPasswordRepeated] = useState('');

let navigate = useNavigate();

    function setVerificationCode(e){
        setCode(e.target.value);
    }

    function setNewPassword(e){
        setPassword(e.target.value);
    }
    
    function setNewPasswordRepeated(e){
        setPasswordRepeated(e.target.value);
    }

    function checkNewPasswordsMatch(){
        if(password == passwordRepeated && password != '' && passwordRepeated != '' && password.match('(?=.{9,})(?=.*?[^\w\s])(?=.*?[0-9])(?=.*?[A-Z]).*?[a-z].*'))
            return true;
        return false;
    }

    return (
        <div className="app-content">
            <div className="app-content-wrapper">
                <h1 className="form-title">{text}</h1>
                <form>
                    <div className="input-group">
                        <label>Verification code</label>
                        <input type="text" placeholder="Verification code" onChange={(e) => setVerificationCode(e)} ></input>
                    </div>
                    <div className="input-group">
                        <label>New password</label>
                        <input type="password" placeholder="Password" onChange={(e) => setNewPassword(e)} ></input>
                    </div>
                    <div className="input-group" id="input-group-second">
                        <label>Repeat password</label>
                        <input type="password" placeholder="Password" onChange={(e) => setNewPasswordRepeated(e)} ></input>
                    </div>
                    <Button onClick={() => { if(checkNewPasswordsMatch()) { if(onClick(password,code)) navigate('../login', {replace: true}); } else alert("Passwords must be same!"); }} text={text}/>
                </form>
            </div>
        </div>
    )
}

export default NewPassword;