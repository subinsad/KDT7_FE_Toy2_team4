import React from "react";
import { CardContent, Grid, Paper, Typography } from "@mui/material";
import Card from "../Card";

const ChatHeader = ({ currentChennel }) => {
  return (
    <Card container component={Paper} variant="outlined" title={`${currentChennel?.name} 채널`}>
      {/* <Typography variant="body1"># {currentChennel?.details}</Typography> */}
      바른말 고운말을 지킵시다.
    </Card>
  );
};

export default ChatHeader;
