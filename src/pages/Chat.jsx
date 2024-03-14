import React, { useEffect, useState, useRef } from "react";
import { ref, getDatabase, onChildAdded, query, orderByChild, startAt, get } from "firebase/database";
import { useSelector, useDispatch } from "react-redux";
import { setChennel } from "../store/chennel.slice";
import ChatHeader from "../components/chatComponents/ChatHeader";
import ChatInput from "../components/chatComponents/ChatInput";
import ChatMessage from "../components/chatComponents/ChatMessage";
import { Divider, Grid, List, Paper } from "@mui/material";

const Chat = () => {
  const { team, uid } = useSelector((state) => state.userSlice.userInfo);
  const { currentChennel } = useSelector((state) => state.chennelSlice);
  const [channels, setChannels] = useState([]);
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();
  const messageEndRef = useRef();

  const findAndSetChannel = (channelList) => {
    const foundChannel = channelList.find((channel) => channel.name === team);
    if (foundChannel) {
      dispatch(setChennel(foundChannel));
    }
  };

  useEffect(() => {
    const channelsRef = ref(getDatabase(), "channels");
    const unsubscribe = onChildAdded(channelsRef, (snapshot) => {
      const newChannel = snapshot.val();
      setChannels((prevChannels) => [...prevChannels, newChannel]);
      findAndSetChannel([...channels, newChannel]);
    });

    get(channelsRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const channelData = snapshot.val();
          const channelList = Object.values(channelData);
          setChannels(channelList);
          findAndSetChannel(channelList);
        }
      })
      .catch((error) => {
        console.error("Error fetching channels:", error);
      });

    return () => {
      setChannels([]);
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (currentChennel) {
      const messagesRef = ref(getDatabase(), "messages/" + currentChennel.id);
      const unsubscribe = onChildAdded(messagesRef, (snapshot) => {
        const newMessage = snapshot.val();
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      // 기존 메시지를 가져와서 설정합니다.
      get(messagesRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const messageData = snapshot.val();
            const messageList = Object.values(messageData);
            setMessages(messageList);
          }
        })
        .catch((error) => {
          console.error("Error fetching messages:", error);
        });

      return () => {
        setMessages([]);
        unsubscribe();
      };
    }
  }, [currentChennel]);

  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }, 100);
    return () => {
      clearTimeout(setTimeoutId);
    };
  }, [messages.length]);

  return (
    <>
      <ChatHeader currentChennel={currentChennel} />
      <Grid container component={Paper} variant="outlined" sx={{ mt: 3, position: "relative" }}>
        <List
          sx={{
            height: "calc(100vh - 350px)",
            overflow: "scroll",
            width: "100%",
            position: "relative",
          }}
        >
          {messages.map((message) => (
            <ChatMessage key={message.timestamp} message={message} uid={uid} />
          ))}
          <div ref={messageEndRef}></div>
        </List>
        <Divider />
        <ChatInput />
      </Grid>
    </>
  );
};

export default Chat;
