import React from 'react'
import Item from './Item'

class Items extends React.Component {

    constructor(props) {
        super(props);
        this.state = {items: []};
    }

    // starts a timer that refreshes the items every 1000ms (wasteful, yes)
    componentDidMount() {
        this.timer = setInterval(()=> this.getItems(), 3000);
    }
  
    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null; // here...
    }

    getItems() {
        let domain = window.location.hostname
        fetch(this.props.nodeUrl + this.props.type)
          .then(result => result.json())
          .then(result => {
            var items = [];
            result.data.forEach( item => {
              // map the complex REST API response to a flatter structure
              let itemvotes = result.votes[item.id] || 0
              items.push({
                id: item.id,
                title: item.title.rendered,
                votes: itemvotes,
                image: item._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url.replace('localhost',domain),
                caption: item._embedded['wp:featuredmedia'][0].caption.rendered.replace('localhost',domain),
                link: item._embedded['wp:featuredmedia'][0].link.replace('localhost',domain)
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
                type={this.props.type}
                nodeUrl={this.props.nodeUrl}
                id={item.id}
                image={item.image}
                title={item.title}
                link={item.link}
                caption={item.caption}
                votes={item.votes}
              />
            ))
          }
        </div>
        )
    }
}

export default Items

