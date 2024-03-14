import React from "react";
import { child, get, getDatabase, onChildAdded, orderByChild, push, query, ref, startAt, update } from "firebase/database";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setChennel } from "../store/chennel.slice";
import ChatHeader from "../components/chatComponents/ChatHeader";
import { Divider, Grid, List, Paper } from "@mui/material";
import ChatInput from "../components/chatComponents/ChatInput";
import ChatMessage from "../components/chatComponents/ChatMessage";
import { useRef } from "react";

const Chat = () => {
  const { team, uid } = useSelector((state) => state.userSlice.userInfo);
  const { currentChennel } = useSelector((state) => state.chennelSlice);
  const [channels, setChannels] = useState([]);
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();
  const messageEndRef = useRef();

  const findAndSetChannel = () => {
    //해당 유저의 팀과 팀채널을 찾아서 dispatch로 현재 채널을 설정해줌.
    const foundChannel = channels.find((channel) => channel.name === team);
    if (foundChannel) {
      dispatch(setChennel(foundChannel)); // 선택된 채널을 dispatch
    }
  };

  useEffect(() => {
    //페이지 마운트 시 채널 전부를 가져와서 모든 채널 정보를 setChannels 해준다
    const unsubscribe = onChildAdded(ref(getDatabase(), "channels"), (snapshot) => {
      const newChannel = snapshot.val();
      setChannels((prevChannels) => [...prevChannels, newChannel]);
    });
    return () => {
      setChannels([]);
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    findAndSetChannel();
  }, [channels]);

  useEffect(() => {
    //페이지 마운트 시 기존 채널에 있던 메세지 정보를 들고와서 setMessages 해준다
    async function getMessages() {
      const snapShot = await get(child(ref(getDatabase()), "messages/" + currentChennel.id));
      setMessages(snapShot.val() ? Object.values(snapShot.val()) : []);
    }
    getMessages();
    return () => {
      setMessages([]);
    };
  }, [currentChennel]);

  useEffect(() => {
    const sorted = query(ref(getDatabase(), "messages/" + currentChennel.id), orderByChild("timestamp"));
    const unsubscribe = onChildAdded(query(sorted, startAt(Date.now())), (snapshot) => setMessages((oldMessages) => [...oldMessages, snapshot.val()]));
    return () => {
      unsubscribe?.();
    };
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
