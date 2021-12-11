import React from 'react';

function button({onClick,text,disabled}){
  return (
    <button disabled={disabled} type="button" className="btn" onClick={onClick}>{text}</button>
  )
}

export default button;