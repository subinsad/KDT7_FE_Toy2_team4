import { Grid, IconButton, InputAdornment, TextField } from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import React from 'react'
import { useState } from 'react';
import { getDatabase, push, ref, serverTimestamp, set } from 'firebase/database';
import { useSelector } from 'react-redux';

const ChatInput = () => {
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false);
    const { currentChennel } = useSelector((state) => state.chennelSlice);
    const { name, uid, userImg } = useSelector((state) => state.userSlice.userInfo)

    const handleChange = (e) => {
        setMessage(e.target.value)
    };

    const createMessage = () => ({
        timestamp: serverTimestamp(),
        user: {
            id: uid,
            name: name,
            avatar: userImg,
        },
        content: message,
    })

    const clickSendMessage = async () => { //send버튼 누를때 전달 
        if (!message) return;
        setLoading(true); //로딩중이면 send 버튼 막기
        try {
            await set(push(ref(getDatabase(), "messages/" + currentChennel.id)),
                createMessage()
            );
            setLoading(false);
            setMessage("");
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

    return (
        <Grid container sx={{ p: "20px" }}>
            <Grid item xs={12} sx={{ position: "relative" }}>
                <TextField
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconButton disabled={true}>
                                    <MarkunreadIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="start">
                                <IconButton >
                                    <ReplyIcon disabled={loading} onClick={clickSendMessage} />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    autoComplete="off"
                    label="메세지 입력"
                    fullWidth
                    value={message}
                    onChange={handleChange}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            clickSendMessage();
                        }
                    }}
                />
            </Grid>
        </Grid>
    )
}

export default ChatInput
