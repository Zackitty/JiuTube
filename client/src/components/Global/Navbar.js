import React, { useState } from 'react';
import Chat from '../Chat/Chat/Chat'
import JiuTubePlayer from '../StreamingPlayer/JiuTubePlayer'
import SignInButton from '../Auth/SignInButton'
import './Global.css';
const NavBar = ({ token }) => {
  return (  
  <div>
  <div className='splash-nav__container'>
    <div className='logo'>The Jiu-Tube</div>
    <div className='pixr_logout_container'/>
    <SignInButton />
    </div>
    <div className='VC__Container'>
      <div id="VC__Container" className='VC__Container'>
        <JiuTubePlayer /> 
        <Chat />
    </div>
      </div>
  </div>
  
  );
};

export default NavBar;