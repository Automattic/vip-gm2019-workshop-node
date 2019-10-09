import React from 'react'
import DOMPurify from 'dompurify'

class Item extends React.Component {

  addVote = () => {
    this.vote('+')
  }
  subtractVote = () => {
    this.vote('-')
  }

  vote = dir => {
    console.log(dir);
    fetch(this.props.nodeUrl + 'vote/' + this.props.type + '-' + this.props.id + '/' + dir, {method: 'post'})
      .then(result => result.json())
      .then(result => console.log(result))
  }

  render() {
    return (
      <div key={this.props.id}>
        <img
          src={this.props.image}
          alt={this.props.title}
        />
        <div>
          <span className="votes">{this.props.votes}</span>
          <button onClick={this.addVote}>+</button>
          <button onClick={this.subtractVote}>-</button>
        </div>
        <div>
          <h3><a href={this.props.link}>{this.props.title}</a></h3>
        </div>
        <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(this.props.caption)}}></div>
      </div>
    );
  }
}

export default Item