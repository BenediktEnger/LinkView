import React, { useEffect } from 'react';
import CardContainer from './components/cardsContainer';
import './App.css';
import Header from './components/header';
import { UpdateProvider } from './UpdateContext';
import { EditProvider } from './EditContext';

function App() {


  return (
    <EditProvider>
      <UpdateProvider >
        <Header />
        <CardContainer />
      </UpdateProvider>
    </EditProvider>
  );
}

export default App;
