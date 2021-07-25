import {
  Box,
  makeStyles,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Messege from "./Messeges";
import User from "./User";
import Conversation from "./conversation";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { Redirect } from "react-router-dom";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
const socket = io("http://localhost:8000");
const useStyles = makeStyles((theme) => ({
  Container: {
    height: `calc(100vh - 321px)`,
    "@global": {
      "*::-webkit-scrollbar": {
        width: "0.4em",
      },
      "*::-webkit-scrollbar-track": {
        "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
      },
      "*::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(0,0,0,.1)",
        outline: "1px solid slategrey",
      },
    },
  },
  OnlineUsers: {
    flexBasis: "17%",
  },
  Meseages: {
    flexBasis: "80%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textarea: {
    resize: "none",
    width: "60%",
    outline: "none",
    padding: "1%",
    marginRight: "3%",
  },
  FormContainer: {
    width: "100%",
  },
  Form: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  usersOpen:{

    transform: "translateX(0)",
    transition: theme.transitions.create(["transform"], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  usersClose:{
    transform: "translateX(-280px)",    
    transition: theme.transitions.create(["transform"], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.leavingScreen,
    }),
  }
}));

const Chat = (props) => {
  const classes = useStyles();
  const { username } = props;
  const { id } = useParams();
  const [oldMesseges, setOldMesseges] = useState([]);
  const [ownMesseges, setownMesseges] = useState([]);
  const [notownMesseges, setnotownMesseges] = useState([]);
  const [ActiveUsers, setActiveUsers] = useState([]);
  const [newMessage, setNewMessage] = useState([]);
  const [Value, setValue] = useState(null);
  const [Done, setDone] = useState(false);
  const [openUsers, setopenUsers] = useState(false);
  const [DoneSending, setDoneSending] = useState(false);
  const room = id;

  useEffect(() => {
    console.log("start");
    setOldMesseges([]);
    setActiveUsers([]);
    setDone(true);
    console.log("room", room);
    socket.emit("join", { username, room }, () => {
      console.log("emmitted");
  
    });
    socket.emit("chatHistory", room.toLowerCase());
    socket.on("returnChatHistory", (data) => {
      setOldMesseges(data);
      console.log("history returned");
      if (oldMesseges.length != 0 && newMessage.length != 0) {
        document.querySelector(".Messagecontainer").scrollTop =
          document.querySelector(".Messagecontainer").scrollHeight;
      }
      setDone(false);
    });
    donesend();
  }, [id, DoneSending]);

  const donesend = () => {
    socket.on("message", (message) => {
      setNewMessage((prevChat) => prevChat.concat([{ message }]));

      console.log("New Message");
      if (oldMesseges.length != 0 && newMessage.length != 0) {
        document.querySelector(".Messagecontainer").scrollTop =
          document.querySelector(".Messagecontainer").scrollHeight;
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("sendMessage", Value, (error) => {
      //enable
      if (error) {
        return console.log(error);
      }
      setDoneSending(!DoneSending);
      console.log("message delivered");
    });

    console.log(ActiveUsers);

    console.log(oldMesseges);
    console.log(Value);
    Array.from(document.querySelectorAll("textarea")).forEach(
      (textarea) => (textarea.value = null),
      setValue(null)
    );
  };

  if (localStorage.getItem("user") == null) {
    socket.disconnect();
    setActiveUsers([]);
  }
  const transition = ()=>{
    socket.emit("askroomData", room);

    socket.on("roomData", ({ room, users }) => {
      setActiveUsers(users);
      console.log(users)
      console.log("active users done");
    });
    setopenUsers(true)
  }
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      className={classes.Container}
    >
      <div className={classes.OnlineUsers} style={{display:'flex', alignItems: 'baseline' }}>
        <IconButton onClick={transition} style={{display:openUsers? 'none':'flex'}}>
          <PeopleAltIcon />
        </IconButton>
        <Box
          style={{
            width:'100%',
            overflow: "auto",
            height: "100%",
            boxShadow: "0px 0px 2px",
          }}
          className={openUsers?classes.usersOpen:classes.usersClose}

        >
          <div

            style={{
              display: "flex",
              textAlign: "center",
              borderBottom: "3px inset",
              marginBottom: "20px",
              width: "100%",
              justifyContent: "flex-end",
              alignItems: "baseline",
              position: "sticky",
              top: 0,
              background: "#fff",
              zIndex: "5",
            }}
          >
            <h1
              style={{
                fontWeight: "bolder",
                width: "70%",
              }}
            >
              Active Users
            </h1>
            <IconButton style={{ padding: 0, width: "15%" }} onClick={()=>setopenUsers(false)}>x</IconButton>
          </div>

          {ActiveUsers
            ? ActiveUsers.map((user) => <User user={user} />)
            : "no active users"}
        </Box>
      </div>
      <div className={classes.Meseages}>
        <div
          className="Messagecontainer"
          style={{
            padding: "0 20px",
            overflow: "auto",
            margin: "10px",
            width: "100%",
          }}
        >
          {console.log("hereold", oldMesseges)}

          {Done ? (
            <h1>loading...</h1>
          ) : oldMesseges.length != 0 ? (
            oldMesseges.map((mess, index) =>
              mess.sendername != username ? (
                <Messege mess={mess} name={username} own={true} />
              ) : (
                <Messege mess={mess} name={username} own={false} />
              )
            )
          ) : newMessage.length != 0 ? null : (
            "no old messages in this chat"
          )}
          {newMessage.length != 0
            ? newMessage.map((newmess) =>
                newmess.message.username != username ? (
                  <Conversation Newone={newmess} own={true} />
                ) : (
                  <Conversation Newone={newmess} own={false} />
                )
              )
            : null}
        </div>
        <div className={classes.FormContainer}>
          <form onSubmit={handleSubmit} className={classes.Form}>
            <textarea
              className={classes.textarea}
              rows={3}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter Your Message..."
            />
            <Button
              color="primary"
              variant="contained"
              disabled={Value == null}
              type="submit"
            >
              Send
            </Button>
          </form>
        </div>
      </div>
    </Box>
  );
};

export default Chat;
