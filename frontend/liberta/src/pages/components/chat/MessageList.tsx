// components/MessageList.tsx
import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core';
import { Box, Grid, Typography } from '@mui/material';
import { Avatar } from '@mui/material';
import { Message, User } from 'interfaces';
import { formatDate } from 'pages/utils/format';

const useStyles = makeStyles((theme) => ({
  messagesContainer: {
    padding: theme.spacing(2),
    width: "100%",
    overflowY: "auto",
  },
  message: {
    borderRadius: 15,
  },
  receivedMessage: {
    backgroundColor: "#FFFFFF",
    alignSelf: "flex-start",
  },
  sentMessage: {
    backgroundColor: "#00bfa5",
    alignSelf: "flex-end",
    color: "#FFFFFF",
},
}));

interface MessageListProps {
  messages: Message[];
  currentUser: User | undefined;
}

const MessageList: React.FC<MessageListProps> = ({ messages, currentUser }) => {
  const classes = useStyles();
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Box className={classes.messagesContainer} ref={messagesContainerRef}  sx={{height: {xs: "50vh",md:"60vh"}}}>
      {messages.map((message) => (
        <Grid
          key={message.id}
          item
          container
          justifyContent={
            message.userId != currentUser?.id ? "flex-start" : "flex-end"
          }
        >
          {message.userId === currentUser?.id ? (
            <>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Typography sx ={{mr: 1}} variant='subtitle2'>{formatDate(message.createdAt)}</Typography>
              <Typography
                sx={{ mb: 2, mr: { xs: 3, md: 10 }, padding: { xs: 1, md: 2 } }}
                className={`${classes.message} ${classes.sentMessage}`}
              >
                {message.content}
              </Typography>
            </Box>
            </>
          ) : (
            <>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Avatar sx={{ mr: 2 }} alt="Remy Sharp" src="/images/dog.jpg" />
              <Typography
                sx={{ mb: 2, mr: 3, padding: { xs: 1, md: 2 } }}
                className={`${classes.message} ${classes.receivedMessage}`}
              >
                {message.content}
              </Typography>
              <Typography variant='subtitle2'>{formatDate(message?.createdAt)}</Typography>
            </Box>
            </>
          )}
        </Grid>
      ))}
    </Box>
  );
};

export default MessageList;

