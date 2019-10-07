import React from 'react';
import DOMPurify from 'dompurify';
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
      // map the complex REST API response to a flatter structure
      items.push({
        id: item.id,
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
              fontSize: '2rem',
              marginBottom: '3rem'
            }}
            onClick={getFoods}>Submit
          </button>
          <br />
          {
            foods.map(food => (
              <div key={food.id}>
                <img
                  src={food.image}
                  alt={food.title}
                />
                <div>
                  <h3><a href={food.link}>{food.title}</a></h3>
                </div>
                <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(food.caption)}}></div>
              </div>
            ))
          }
        </div>
      </header>
    </div>
  );
}

export default App;
