import React, { useEffect } from 'react';
import CardContainer from './components/cardsContainer';
import './App.css';
import Header from './components/header';
import { AppProvider } from './AppContext';

function App() {

  
  return (
    <AppProvider >
      <Header/>
      <CardContainer/>
    </AppProvider>
  );
}

export default App;
