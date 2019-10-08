import React from 'react'
import Item from './Item'

class Items extends React.Component {

    constructor(props) {
        super(props);
        this.state = {items: []};
    }

    // starts a timer that refreshes the items every 1000ms (wasteful, yes)
    componentDidMount() {
        this.timer = setInterval(()=> this.getItems(), 1000);
    }
  
    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null; // here...
    }

    getItems() {
        fetch(`http://localhost:4000/food`)
          .then(result => result.json())
          .then(result => {
            var items = [];
            result.data.forEach( item => {
              // map the complex REST API response to a flatter structure
              items.push({
                id: item.id,
                title: item.title.rendered,
                image: item._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url,
                caption: item._embedded['wp:featuredmedia'][0].caption.rendered,
                link: item._embedded['wp:featuredmedia'][0].link
              })
            })
          this.setState({items: items })
        })
        .catch( err => {
            console.log( 'Fetch error: ', err)
        })
    }


    render() {


        return (
        <div>
          <h1>{this.props.title}</h1>
          {
            this.state.items.map(item => (
              <Item 
                id={item.id}
                image={item.image}
                title={item.title}
                link={item.link}
                caption={item.caption} />
            ))
          }
        </div>
        )
    }
}

export default Items

