import React from 'react';
import logo from './wpcomvip_logo_main-white.svg';

import Items from './Items'
import './App.css';
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from 'constants';

function ReactIsInDevelomentMode(){ 
  return '_self' in React.createElement('div');
}

function App() {

  // when in develop mode, nodeURL may need to be seta to port 4000, in order to talk to the server
  let nodeUrl = window.location.href
  if (ReactIsInDevelomentMode()) {
    // point at the running container exposed on 4000
    nodeUrl = "http://localhost:4000/"
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="WordPress VIP" />
        <Items title="Dutch Foods" nodeUrl={nodeUrl} type="food" />
      </header>
    </div>
  );
}

export default App;
