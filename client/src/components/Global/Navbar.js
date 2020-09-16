import React, { useState } from 'react';
import Chat from '../Chat/Chat/Chat'
import JiuTubePlayer from '../StreamingPlayer/JiuTubePlayer'
import SignUp from '../Auth/SignUp'
const NavBar = ({ token }) => {
  return (  
  <div>
  <div className='splash-nav__container'>
    <div className='logo'>The Jiu-Tube</div>
    <div className='pixr_logout_container'/>
    </div>
    <div>
    {/* <JiuTubePlayer />  */}
    {/* <Chat /> */}
    <SignUp />
      </div>
  </div>
  
  );
};

export default NavBar;