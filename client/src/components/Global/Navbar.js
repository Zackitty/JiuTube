import React, { useState, useEffect, useSelector } from 'react';
import Chat from '../Chat/Chat/Chat'
import { useParams, useHistory} from 'react-router-dom'
import JiuTubePlayer from '../StreamingPlayer/JiuTubePlayer'
import SignInButton from '../Auth/SignInButton'
import SignOut from '../Auth/SignOut'
import './Global.css';
const NavBar = (props) => {
  let history = useHistory();
  const USER_ID = localStorage.getItem('USER_ID')
  


  useEffect(() => {
  
    return history.push(`/`);
  }, [USER_ID])
  
  return (  
  <div>
  <div className='splash-nav__container'>
    <div className='nav__container'>
      <div  className="logo__Container">
    <div className='logo'>The Jiu-Tube</div>
    </div>
    <div className='pixr_logout_container'/>
  <div className="signin__holder" >
    {!USER_ID ?
          <SignInButton label="Sign In"   />
          :
          <SignOut label="Sign Out" />
        }
     </div>
</div>
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