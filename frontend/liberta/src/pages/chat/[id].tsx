// components/ChatRoom.tsx
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from 'pages/_app';
import { getChatroom, getMessages } from 'pages/api/chatroom';
import { makeStyles } from '@material-ui/core';
import { Box } from '@mui/system';
import { AppBar, Avatar, Button, Container, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper, TextField, Theme, Toolbar, Typography } from '@mui/material';
import { ArrowBack, ArrowBackIosNew, MoreVert, Send } from '@mui/icons-material';
import { User } from 'interfaces';
import { useRouter } from 'next/router';
import useChat from 'pages/components/hooks/useChat';
import MessageList from 'pages/components/chat/MessageList';
import InputBar from 'pages/components/chat/InputBar';

const useStyles = makeStyles((theme) => ({
  chatContainer: {
    backgroundColor: "#F0F2F5",
  },
}));

const ChatRoom: React.FC = () => {
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();
  const chatroomId = router.query.id as string;
  const classes = useStyles();
  const { messages, handleSendMessage, handleChangeContent, inputValue, user,isLoading } = useChat(chatroomId, currentUser);

  const handleBackChatList = () => {
    if(!currentUser) return
    if(currentUser.studentProfile){
      router.push(`/student/${currentUser.id}/ChatList`);
    }else{
      router.push(`/teacher/${currentUser.id}/ChatList`);
    }
  };

  if(isLoading) return (<div>loading...</div>);
  
  return (
    <Box className={classes.chatContainer} sx={{height: {xs: "73vh",md: "88vh"},width: "100vw"}}>
      <AppBar position="static" sx={{height: "8vh"}}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="back">
            <ArrowBackIosNew onClick={handleBackChatList} />
          </IconButton>
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ml: 2}}>
            <Avatar sx={{mr: 2}} alt="Remy Sharp" src="/images/dog.jpg"  />
            <Typography variant="subtitle1" component="div">
              {user?.name}
            </Typography>
          </Box>
          <Box flexGrow={1}></Box>
          <IconButton edge="end" color="inherit" aria-label="menu">
            <MoreVert />
          </IconButton>
        </Toolbar>
      </AppBar>
      <MessageList messages={messages} currentUser={currentUser} />
      <InputBar inputValue={inputValue} handleChangeContent={handleChangeContent} handleSendMessage={handleSendMessage} />
    </Box>
  );
};

export default ChatRoom;
