// components/InputBar.tsx
import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Box, IconButton, TextField } from '@mui/material';
import { Send } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
  inputContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
  },
  messageInput: {
    flexGrow: 1,
    marginLeft: theme.spacing(2),
    backgroundColor: "#F0F2F5",
    borderRadius: 20,
    '& fieldset': {
      border: 'none',
    },
  },
  sendButton: {
    backgroundColor: "#1DA1F2",
    color: "#FFFFFF",
    borderRadius: "50%",
    marginRight: theme.spacing(1),
    height: 40,
    width: 40,
    '&:hover': {
      backgroundColor: "#1A91DA",
    },
  },
}));

interface InputBarProps {
  inputValue: string;
  handleChangeContent: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSendMessage: () => void;
}

const InputBar: React.FC<InputBarProps> = ({
  inputValue,
  handleChangeContent,
  handleSendMessage,
}) => {
  const classes = useStyles();

  return (
    <Box className={classes.inputContainer} sx={{height: {xs: "25%",md: "30%"}}}>
      <TextField
        fullWidth
        className={classes.messageInput}
        placeholder="メッセージを入力..."
        variant="outlined"
        onChange={handleChangeContent}
        value={inputValue}
      />
      <IconButton className={classes.sendButton} onClick={handleSendMessage}>
        <Send color="primary" />
      </IconButton>
    </Box>
  );
};

export default InputBar;
