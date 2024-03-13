import React from 'react'
import { Avatar, Grid, ListItem, ListItemAvatar, ListItemText, } from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const ChatMessage = ({ message, uid }) => {
    return (
        <ListItem >
            <ListItemAvatar sx={{ alignSelf: "stretch" }}>
                <Avatar
                    variant="rounded"
                    sx={{ width: 50, height: 50 }}
                    alt="profile image"
                    src={message.user.avatar}
                />
            </ListItemAvatar>
            <Grid container sx={{ ml: 2 }} >
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "left" }}>
                    <ListItemText
                        sx={{ display: "flex", marginTop: "-4px" }}
                        primary={message.user.name}
                        primaryTypographyProps={{
                            fontWeight: "bold",
                            color:
                                message.user.id === uid ? "orange" : "black",
                        }}
                        secondary={dayjs(message.timestamp).fromNow()}
                        secondaryTypographyProps={{ color: "gray", ml: 1 }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <ListItemText
                        align="left"
                        xs={{ wordBreak: "break-all", marginTop: "-4px" }}
                        primary={message.content}
                    />
                </Grid>
            </Grid>
        </ListItem>
    )
}

export default ChatMessage
