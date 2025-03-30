import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { TodoContext } from './context/TodoContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <App />
  </StrictMode>
);