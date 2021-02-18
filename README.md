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

<Graph
