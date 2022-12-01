# JiuTube
*by Zachery Haley* | [Live Site](https://jiutube.onrender.com/)

### Table of Contents
- [The User Interface](https://github.com/Zackitty/JiuTube#the-user-interface)
- [Architecture & Technologies](https://github.com/Zackitty/JiuTube#architecture-&-technologies)
- [The FrontEnd](https://github.com/Zackitty/JiuTube#the-frontend)
- [The Backend](https://github.com/Zackitty/JiuTube#the-backend)
- [Challenges & The Future](https://github.com/Zackitty/JiuTube#challenges-and-the-future)

## The User Interface
The JiuTube is a React.js Full Stack Application with a Flask Backend server that allows users to watch a live streaming Jiujitsu video player while chatting about the matches.
  
The chat box integrates [Flask-Socketio](https://flask-socketio.readthedocs.io/en/latest/) and [Socket.IO-Client](https://socket.io/docs/v3/client-api/index.html) to send and receieve messages. It uses references and stored information in the PostgreSQL database that is queried and dispatched into each slice of state in the [Redux Store](https://redux.js.org/api/store) to allow users to see previous messages and block message from harmful users.

![Image of Redux Block Working](https://media4.giphy.com/media/EDaalK5jmRLDUenEH6/giphy.gif)
  
References in the Redux store and in the SQL database also change the state of the UI's CSS switching colors based on the User's belt color without effecting other components of that don't need access to that information or reloading the website.

![Image of Redux WOrking](https://media4.giphy.com/media/XcJpE33iLgxU0qZRGF/giphy.gif)

## Architecture & Technologies

The Full Stack application stores users and messages in a backend SQL database. The Flask-Server takes a RESTFul API call from the React Front-End to make a GET request to the server that uses SQL Alchemy to create a query in the database that will create a chat history as you start up the page, and uses SocketIO technology to create a live Chat. The main feature is the video player using OBS to stream to Twitch. It also uses AWS to allow users to have a personal avatar in their chat messages.
  
## The FrontEnd

The application is mainly visual with users viewing the video player and chat along with the entire colorscheme changing based on belts.  
 
### Frontend Technologies:

#### React & Redux
I mainly used react functional components to create every part of this applications and have them interact with each other. This made the blocking system very easy to incorporate because I was able to tell certain components to change their logic if information is passed to them saying the user doesn't want that component to fire. The Redux Store took references from the backend when users signed up for the website to change the state of the CSS selectors creating a entirely different UI for each different user based on their belt color. I used the same technology in how incorporated the blocking system below.
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


#### OBS and Twitch
I used OBS to stream videos to Twitch that I then hosted in the VideoJS player.
<OBS Image> 
  
#### Socket.Io-Client
I used client side sockets for each user to join the chat room and emit messages to to the backend socket server that are then transferred back to the front end sockets to travel through react components til they're displayed as a message.
 
#### Amazon Web Services
I used the AWS Cloud to host photos that users want to use as their avatar in chat messages.

 
## The BackEnd

#### Flask
I used Flask to host the backend server. This was the best decision because I believe because this site was much more front end heavy so I felt I didn't need a more complicated framework with very much base code.

#### SQL-Alchemy 
I used this because it was another lightweight choice for a very simple back end application. I used the database to store users, all messages created in the chat, and all the blocks created between users. The reason I stored all the messages in a database was pool the last 10 messages and send them through the same process a message sent in real time through sockets would along the frontend react components. This allows users navigating to the website to be able to continue the chat even if they weren't in the room at the time another user sent a message.

### Flask-SocketIO
I used Flask-SocketIO to use allow the Flask server to facilitate communications between the backend with the the front end Socket.IO-client.


```
@bp.route('')
def get_chat():
    response = db.session.query(
        Comment
    ).order_by(Comment.id.desc()).limit(10)
    
    return  {result.id: { "user": result.username, "text": result.content, "avatar": result.avatar, "belt_color": result.belt_color, "user_id": result.user_id } for result in response}
 ```
 ### Docker
 I used a docker container and eventlet to create a container for the environment to automate consistent deployment of the application.
  
## Challenges and The Future

I created this application because I wanted a way I could talk to my friends during the pandemic and watch jiujitsu videos with them in real time. I'm always creating new applications with the mindset of something I know that I or other users would want to be able to use in every day life or to defeat an obstacle we're currently facing.

Creating this app was an incredibly fun being able to work with using the full stack in many different ways from front to back sockets as well as changing the entire UI using both references in the front end store and the back end database. I made the bulk of the website with technologies I had only learned a few weeks prior from the sockets to the Python language along with its Flask framework.

#### The Future
I definitely want to continue working with Docker and be able to have it contain a video playlist that it can stream rather than relying on OBS and Twitch to host the video. I'd also like to ocntinue working to bring a more pleasing UI as I study more styles people implement in CSS.
