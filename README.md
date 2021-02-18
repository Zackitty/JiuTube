# JiuTube
*by Zachery Haley* | [Live Site](https://thejiutube.herokuapp.com/)

### Table of Contents
- [The User Interface](https://github.com/Zackitty/JiuTube#the-user-interface)
- [Architecture & Technologies](https://github.com/Zackitty/JiuTube#architecture-&-technologies)
- [The FrontEnd](https://github.com/Zackitty/JiuTube#the-frontend)
- [The Backend](https://github.com/Zackitty/JiuTube#the-backend)
- [Challenges & The Future](https://github.com/Zackitty/JiuTube/challenges-and-the-future)

## The User Interface
The JiuTube is a React.js Frontend with Flask Backend Full Stack application that allows users to watch a live streaming Jiujitsu video player while chatting about the matches.

<set image>
  
The chat box integrates [Flask-Socketio](https://flask-socketio.readthedocs.io/en/latest/) and [Socket.IO-Client](https://socket.io/docs/v3/client-api/index.html) to send and receieve messages. It uses references store in the [Redux Store](https://redux.js.org/api/store) and the [SQL-Alchemy](https://www.sqlalchemy.org/) database to allow users to see previous messages and block message from harmful users.

<set Image>
  
References in the Redux store and in the SQL-Alchemy database also change the state of the UI's CSS switching colors based on the User's belt color.

<set image>
  
## Architecture & Technologies

The Full Stack application stores users and messages in a SQL-Alchemy database. It takes those to create chat history as you start up the page, and uses SocketIO technology to create a live Chat. The main feature is the video player using OBS to stream to Twitch. 

<Graph>
  
## The FrontEnd

The application is mainly visual with users viewing the video player and chat along with the entire colorscheme changing based on belts.  
 
### Frontend Technologies:

#### React & Redux
I mainly used react functional components to create every part of this applications and have them interact with each other. This made the blocking system very easy to incorporate because I was able to tell certain components to change their logic if information is passed to them saying the user doesn't want to that component to fire. The Redux Store took references from the backend when users signed up for the website to change the state of the CSS selectors creating a entirely different UI for each different user based on their belt color. I used the same technology in how incorporated the blocking system below.
```
const Message = ({ message: { text, user, avatar, belt_color, user_id }, name, blockedArray }) => {
  
  let isSentByCurrentUser = false;
  const [isBlocked, setIsBlocked] = useState(false);
  const { blocks } = useSelector(state => state.currentUser)
  const trimmedName = name
  const blockedNamesArray = [];
  const [isOpen, setIsOpen] = useState(false)
  
  const handleBlock = async (e) => {
   e.preventDefault()
   setIsOpen(true)
 } 
  useEffect(() => {
  checkBlocks()
    }, [user])
    
    const checkBlocks = async ()=> {
      if (blockedArray){
      for (let i = 0; i < blockedArray.length ;i++){
        await fetch(`${apiUrl}/users/${blockedArray[i]}`)
        .then(response => response.json())
        .then(data => blockedNamesArray.push(data.username))}
        blockedNamesArray.forEach(blockedName => {
          
          if (blockedName === user){
            setIsBlocked(true)
          }
        })
    }
  }

 
  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{trimmedName}</p>
          <img className='userAvatar'  src={`${avatar}`}/>
          <div className='messageBox' id={`message${belt_color}`}>
            <p className="messageText" id={`color${belt_color}`}>{ReactEmoji.emojify(text)}</p>
          </div>
        </div>
        )
        : [(isBlocked ? null : (
          <div className="messageContainer justifyStart">
            <div className="otherUserDiv">
            <div className="messageBox" id={`message${belt_color}`}>
              <p className="messageText" id={`color${belt_color}`}>{ReactEmoji.emojify(text)}</p>
            </div>
            
        <img className='differentUserAvatar' onClick={handleBlock}src={`${avatar}`} />
            <p className="sentText pl-10 ">{user}</p>
            </div>
            <div className="blockButtonDiv">
            <BlockButton className="tryThisDiv" open={isOpen} userName={user} user_id={user_id} onClose={() => setIsOpen(false)}/>
          </div>
          </div>
          
        ))]
       
        
  );
}
```


