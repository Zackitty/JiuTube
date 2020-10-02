import React, { useState, useEffect } from "react";

import onlineIcon from '../../../icons/onlineIcon.png';
import closeIcon from '../../../icons/closeIcon.png';

import './InfoBar.css';

const InfoBar = ({ room }) =>{

  
  const userColor = localStorage.getItem('BELT_COLOR')



return (
  <div className={`info${userColor}`}>
    <div className={`leftInnerContainer${userColor}`}>
      <img className="onlineIcon" src={onlineIcon} alt="online icon" />
      {room}
    </div>
    
    <div className="rightInnerContainer">
      <a href="/"><img src={closeIcon} alt="close icon" /></a>
    </div>
  </div>
)}

export default InfoBar;