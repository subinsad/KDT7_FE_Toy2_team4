import React from 'react'
import { CardContent, Grid, Paper, Typography } from "@mui/material";

const ChatHeader = ({ currentChennel }) => {
    return (
        <Grid container component={Paper} variant="outlined">
            <CardContent>
                <Typography variant="h5"># {currentChennel?.name}</Typography>
                <Typography variant="body1"># {currentChennel?.details}</Typography>
            </CardContent>
        </Grid>
    )
}

export default ChatHeader
