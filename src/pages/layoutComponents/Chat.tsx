import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import {
  TextField,
  Box,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  Fab,
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import { AuthState } from 'store/authSlice';
import { RootState } from 'store/store';
import { useSelector } from 'react-redux';
import assistantpfp from 'assets/assistantpfp.png';

const socket = io(import.meta.env.VITE_SOCKET_PATH as string, { transports: ['polling'] });
const roomId = 'room-' + Math.random().toString(36).substr(2, 9); // Generate random room ID for each user

const Chat: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [chat, setChat] = useState<string[]>([]);
  const [clientMessages, setClientMessages] = useState<string[]>([]);

  const { user } = useSelector((state: RootState) => state.auth) as AuthState;

  const handleClickOpen = () => {
    setOpen(true);
    socket.emit('join room', roomId);
  };

  const handleClose = () => {
    setOpen(false);
    socket.emit('leave room', roomId);
  };

  useEffect(() => {
    socket.on('chat message', (msg: string) => {
      setChat([...chat, msg]);
    });

    return () => {
      socket.off('chat message');
    };
  }, [chat]);

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setClientMessages([...clientMessages, message]);
    socket.emit('chat message', message, roomId);
    setMessage('');
  };

  return (
    <div>
      <Fab
        color="primary"
        aria-label="chat"
        onClick={handleClickOpen}
        style={{ position: 'fixed', bottom: '80px', right: '20px' }}
        title="Chat with our virtual assistant!"
      >
        <ChatIcon /> {/* Delete this if you don't want the chat icon */}
      </Fab>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Chat with Handy our virtual assistant</DialogTitle>
        <DialogContent>
          <List>
            {chat.map((msg, i) => (
              <ListItem key={i} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                <Box sx={{ display: 'flex' }}>
                  <Avatar sx={{ m: 1 }} src={user?.pfp}>
                    {user?.fullName}
                  </Avatar>
                  <ListItemText sx={{ pt: 1 }} primary={clientMessages[i]} />
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Avatar sx={{ m: 1 }} src={assistantpfp}>
                    {user?.fullName}
                  </Avatar>
                  <ListItemText sx={{ pt: 1 }} primary={msg} />
                </Box>
              </ListItem>
            ))}
          </List>
          <form onSubmit={sendMessage}>
            <TextField
              autoFocus
              margin="dense"
              id="message"
              label="Your Message"
              type="text"
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button type="submit" color="primary">
              Send
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Chat;
