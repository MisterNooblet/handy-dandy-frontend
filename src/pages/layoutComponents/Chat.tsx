import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { TextField, Box, Avatar, Button, List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, Fab } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import { AuthState } from 'store/authSlice';
import { RootState } from 'store/store';
import { useSelector } from 'react-redux';
import assistantpfp from 'assets/assistantpfp.png';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import greet from 'dtgreeter';
import RatingBoxComponent from 'components/RatingBox';
import styles from './Chat.module.css';

const socket = io(import.meta.env.VITE_SOCKET_PATH as string);

const Chat: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [chat, setChat] = useState<string[]>([]);
  const [clientMessages, setClientMessages] = useState<string[]>([]);
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { user } = useSelector((state: RootState) => state.auth) as AuthState;
  const roomId = 'room-' + user?.id; // Generate random room ID for each user

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
      setIsThinking(false);
    });

    return () => {
      socket.off('chat message');
    };
  }, [chat]);

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.scrollTop = dialogRef.current.scrollHeight;
    }
    if (inputRef.current) {
      inputRef.current.focus(); // Set focus on the input field
    }
  }, [clientMessages]);

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setClientMessages([...clientMessages, message]);
    socket.emit('chat message', message, roomId);
    setIsThinking(true);
    setMessage('');
  };

  const sendRating = (rating: number) => {
    socket.emit('send rating', roomId, rating);
  };

  return (
    <div>
      <Fab color='primary' aria-label='chat' onClick={handleClickOpen} style={{ position: 'fixed', bottom: '80px', right: '20px' }} title='Chat with our virtual assistant!'>
        <ChatIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Chat with Handy our virtual assistant {clientMessages.length > 1 && <RatingBoxComponent onChange={sendRating} />}</DialogTitle>
        <DialogContent ref={dialogRef}>
          <List>
            <ListItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
              <Box sx={{ display: 'flex' }}>
                <Avatar sx={{ m: 1 }} src={assistantpfp}>
                  {'Handy'}
                </Avatar>
                <ListItemText sx={{ pt: 1 }} primary={greet(user?.fullName.split(' ')[0]) + '! How can I assist you today?'} />
              </Box>
            </ListItem>
            {clientMessages.map((msg, i) => (
              <ListItem key={i} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                <Box sx={{ display: 'flex' }}>
                  <Avatar sx={{ m: 1 }} src={user?.pfp}>
                    {user?.fullName}
                  </Avatar>
                  <ListItemText sx={{ pt: 1 }} primary={msg} />
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Avatar sx={{ m: 1 }} src={assistantpfp}>
                    {user?.fullName}
                  </Avatar>
                  <ListItemText className={styles.handyResponseMessage} sx={{ pt: 1 }} primary={<ReactMarkdown remarkPlugins={[remarkGfm]}>{chat[i] ? chat[i] : 'Handy is thinking...'}</ReactMarkdown>} />
                </Box>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <Box component={'form'} onSubmit={sendMessage} sx={{ display: 'flex', p: 4 }}>
          <TextField
            autoFocus
            margin='dense'
            id='message'
            label='Your Message'
            type='text'
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            inputRef={inputRef} // Assign the ref to the input field
          />
          <Button type='submit' color='primary' disabled={isThinking}>
            Send
          </Button>
        </Box>
      </Dialog>
    </div>
  );
};

export default Chat;
