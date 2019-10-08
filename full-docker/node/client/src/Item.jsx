import React from 'react'
import DOMPurify from 'dompurify'

class Item extends React.Component {

    render() {
        return (
        <div key={this.props.id}>
        <img
          src={this.props.image}
          alt={this.props.title}
        />
        <div>{this.props.votes}</div>
        <div>
          <h3><a href={this.props.link}>{this.props.title}</a></h3>
        </div>
        <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(this.props.caption)}}></div>
      </div>
      );
    }
}

export default Item