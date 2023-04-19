import StoreAndAuthProvider from 'pages/layoutComponents/StoreAndAuthProvider';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

let deferredPrompt: any;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  showAddToHomeScreen();
});

function showAddToHomeScreen() {
  // Show the add to home screen button
  const addToHomeScreen = document.getElementById('add-to-home-screen');
  if (!addToHomeScreen) return;
  addToHomeScreen.style.display = 'block';
  addToHomeScreen.addEventListener('click', addToHomeScreenHandler);
}

function addToHomeScreenHandler() {
  // Hide the add to home screen button
  const addToHomeScreen = document.getElementById('add-to-home-screen');
  if (!addToHomeScreen) return;
  if (!deferredPrompt) return;

  addToHomeScreen.style.display = 'none';
  // Show the install prompt
  deferredPrompt.prompt();
  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the A2HS prompt');
    } else {
      console.log('User dismissed the A2HS prompt');
    }
    deferredPrompt = null;
  });
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <StoreAndAuthProvider>
      <App />
    </StoreAndAuthProvider>
  </React.StrictMode>
);
