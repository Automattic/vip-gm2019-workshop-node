import React from 'react';
import logo from './wpcomvip_logo_main-white.svg';
import './App.css';
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from 'constants';

function App() {
  const [count, setCount] = React.useState(0)
  const [foods, setFoods] = React.useState([])

  async function getFoods() {
    const res = await fetch(`http://localhost:4000/food?count=${count}`)
    const resData = await res.json()

    var items = [];
    resData.data.forEach( item => {
      items.push({
        title: item.title.rendered,
        image: item._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url,
        caption: item._embedded['wp:featuredmedia'][0].caption.rendered,
        link: item._embedded['wp:featuredmedia'][0].link
      })
    })
    setFoods(items)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <h1>Dutch Foods</h1>
          <input
            style={{
              fontSize: '2rem'
            }}
            onChange={event => setCount(event.target.value)}
            placeholder='Number of items'
            type='number'
          />
          <button
            style={{
              fontSize: '2rem'
            }}
            onClick={getFoods}>Submit
          </button>
          <br />
          {
            foods.map(food => (
              <div key={food.title}
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
                  src={food.image}
                  alt={food.caption}
                />
                <div>
                  <em>{food.caption}</em>
                  <p><a href="{food.link}">Read More</a></p>
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
