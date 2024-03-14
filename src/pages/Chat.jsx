import React, { useEffect, useState, useRef } from "react";
import { ref, getDatabase, onChildAdded, query, orderByChild, startAt, get } from "firebase/database";
import { useSelector, useDispatch } from "react-redux";
import { setChennel } from "../store/chennel.slice";
import ChatHeader from "../components/chatComponents/ChatHeader";
import ChatInput from "../components/chatComponents/ChatInput";
import ChatMessage from "../components/chatComponents/ChatMessage";
import { Divider, Grid, List, Paper } from "@mui/material";
import Card from "../components/Card";
import styled from "styled-components";
import Aos from "aos";
import "aos/dist/aos.css";

const ChatWrapper = styled.div`
  .chat {
    position: relative;
    padding: 0;
    margin-top: 2rem;
    > div {
      padding: 0;
      > ul {
        position: relative;
        overflow: auto;
        height: calc(100vh - 26rem);
        padding: 1rem;
        display: grid;
        grid-template-columns: 1fr;
        align-items: flex-start;
        gap: 1rem;
        grid-template-rows: repeat(auto-fill, minmax(4.5rem, 10rem));
        &::-webkit-scrollbar {
          width: 0.4rem;

          background-color: transparent;
        }
        &::-webkit-scrollbar-thumb {
          width: 0.4rem;
          background-color: var(--darkLabel);
          border-radius: 0.4rem;
        }
        &::-webkit-scrollbar-track {
          background-color: transparent;
        }
        > li {
          background-color: var(--secondaryLabel);
          border-radius: 0.4rem;
          width: auto;
          max-width: 50%;
          align-self: start;
          position: relative;
          &::after {
            position: absolute;
            left: 0;
            bottom: -0.5rem;
            content: "";
            border-width: 1rem;
            border-color: transparent transparent transparent var(--secondaryLabel);
            border-style: solid;
          }
          &:has(span[class*="css-1mo9ecu"]) {
            justify-self: end;
            &::after {
              left: inherit;
              right: 0;
              border-color: transparent var(--secondaryLabel) transparent transparent;
            }
          }
          div:last-child {
            flex: 1;
          }
        }
      }
    }
    .chat-input {
    }
  }
`;
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
    Aos.init({
      duration: 500,
    });
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
      <ChatWrapper>
        <Card container component={Paper} className="chat">
          <List>
            {messages.map((message) => (
              <ChatMessage key={message.timestamp} message={message} uid={uid} />
            ))}
            <div ref={messageEndRef}></div>
          </List>
          <ChatInput className="chat-input" />
        </Card>
      </ChatWrapper>
    </>
  );
};

export default Chat;
