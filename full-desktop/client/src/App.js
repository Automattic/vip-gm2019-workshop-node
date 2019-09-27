import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [count, setCount] = React.useState(0)
  const [people, setPeople] = React.useState([])

  async function getPeople() {
    const res = await fetch(`http://localhost:4000/users?count=${count}`)
    const resData = await res.json()
    setPeople(resData.data)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <h1>React and Node People Fetcher</h1>
          <input
            style={{
              fontSize: '2rem'
            }}
            onChange={event => setCount(event.target.value)}
            placeholder='Number of people'
            type='number'
          />
          <button
            style={{
              fontSize: '2rem'
            }}
            onClick={getPeople}>Submit
          </button>
          <br />
          {
            people.map(person => (
              <div key={person.email}
              style={{
                width: '100%',
                display: 'flex',
                marginTop: '0.5em',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <img
                  style={{
                    borderRadius: '50%',
                    height: '100%'
                  }}
                  src={person.picture.large}
                  alt={person.name.first}
                />
                <div>
                  <h3>{person.name.first}</h3>
                  <p>{person.email}</p>
                </div>
              </div>
            ))
          }
        </div>
      </header>
    </div>
  );
}

export default App;
