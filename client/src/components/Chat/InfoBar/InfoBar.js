import React from "react";
import { useSelector } from 'react-redux';
import onlineIcon from '../../../icons/onlineIcon.png';

import './InfoBar.css';

const InfoBar = ({ room }) => {

  // Take room name from the props and use the belt color from the 
  // store to change the color of the info bar
  const { belt_color } = useSelector(state => state.currentUser)




  return (
    <div className={`info${belt_color}`}>
      <div className={`leftInnerContainer${belt_color}`}>
        <img className="onlineIcon" src={onlineIcon} alt="online icon" />
        {room}
      </div>

      <div className="rightInnerContainer">
      </div>
    </div>
  )
}

export default InfoBar;