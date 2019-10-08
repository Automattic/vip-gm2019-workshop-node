import React from 'react';
import logo from './wpcomvip_logo_main-white.svg';
import Items from './Items'
import './App.css';
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from 'constants';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Items title="Dutch Foods" key="foods" src="http://localhost:4000/food" />
      </header>
    </div>
  );
}

export default App;
