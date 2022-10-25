import React from 'react';
import Chat from '../Chat/Chat/Chat'
import { useSelector } from 'react-redux';
import JiuTubePlayer from '../StreamingPlayer/JiuTubePlayer'
import SignInButton from '../Auth/SignInButton'
import SignOut from '../Auth/SignOut'
import './Global.css';
const NavBar = (props) => {

  const USER_ID = localStorage.getItem('USER_ID')
  const { belt_color } = useSelector(state => state.currentUser)



  return (
    <div className='splash-nav__container'>
      <div id={`nav${belt_color}`} className='nav__container'>
        <div className="logo__Container">
          <div className='JiuJitsu__Container'>

            <img id='JiuJitsuPic1'
              src="https://64.media.tumblr.com/12edb5ec9d3f12800fdb991343ced81a/4ca9555b24f30f8a-05/s1280x1920/d6549b2d912f8cb4a75d0f08dfe0e692fe3995b9.jpg">
            </img>


            <div className='logo'><p>The Jiu-Tube</p></div>


            <img id='JiuJitsuPic2'
              src="https://64.media.tumblr.com/24a4a8141d4486449f8cad18e8be7145/4ca9555b24f30f8a-14/s1280x1920/7bf32fcc0710c2e82c382dc88b53080770d99db5.jpg">
            </img>
          </div>



          <div className="signin__container">
            <div className="signin__holder" >
              {!USER_ID ?
                <SignInButton label="Sign In" />
                :
                <SignOut label="Sign Out" />
              }
            </div>
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