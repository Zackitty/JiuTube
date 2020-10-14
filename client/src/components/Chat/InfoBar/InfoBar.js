import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import onlineIcon from '../../../icons/onlineIcon.png';
import closeIcon from '../../../icons/closeIcon.png';

import './InfoBar.css';

const InfoBar = ({ room }) =>{

  
  const { belt_color } = useSelector(state => state.currentUser)



return (
  <div className={`info${belt_color}`}>
    <div className={`leftInnerContainer${belt_color}`}>
      <img className="onlineIcon" src={onlineIcon} alt="online icon" />
      {room}
    </div>
    
    <div className="rightInnerContainer">
      <a href="/"><img src={closeIcon} alt="close icon" /></a>
    </div>
  </div>
)}

export default InfoBar;