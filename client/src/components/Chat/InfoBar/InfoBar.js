import React, { useState, useEffect } from "react";

import onlineIcon from '../../../icons/onlineIcon.png';
import closeIcon from '../../../icons/closeIcon.png';

import './InfoBar.css';

const InfoBar = ({ room }) =>{

  const [color, setColor] = useState('White');
  // const userColor = localStorage.getItem('BELT_COLOR')
  // setColor(userColor)


return (
  <div className={`info${color}`}>
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="online icon" />
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
      <a href="/"><img src={closeIcon} alt="close icon" /></a>
    </div>
  </div>
)}

export default InfoBar;