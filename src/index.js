import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import TemplatesProvider from './components/TemplatesContext/TemplatesContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
    <TemplatesProvider>
      <App />
    </TemplatesProvider>
  // </React.StrictMode>
);

