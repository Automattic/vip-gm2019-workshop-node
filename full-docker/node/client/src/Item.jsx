import React from 'react'
import DOMPurify from 'dompurify'

class Item extends React.Component {

  state = {
    votePending: false
  }

  addVote = () => {
    this.vote('+')
  }
  subtractVote = () => {
    this.vote('-')
  }

  // vote event handler
  vote = dir => {

    this.setState({votePending: true})
    // POST to /vote/food-20/+ for example
    fetch(this.props.nodeUrl + 'vote/' + this.props.type + '-' + this.props.id + '/' + dir, {method: 'post'})
      .then(result => result.json())
      .then(result => {
        // TODO - update the count for immediate feedback
        this.setState({votePending: false})
      })
      .catch(err => console.log( 'Vote error: ', err ))
  }

  render() {
    const { votePending } = this.state

    return (
      <div className="item-block" key={this.props.id}
        style={{
          backgroundImage: `url(${this.props.image})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}>
        <div className="item-title">
          <h3><a href={this.props.link}>{this.props.title}</a></h3>
        </div>
        <div className={`vote-section ${votePending ? "vote-pending" : ""}`}>
          <button className="add" onClick={this.addVote}>+</button>
          <span className="votes">{this.props.votes}</span>
          <button className="subtract" onClick={this.subtractVote}>-</button>
        </div>
        <div className="item-caption" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(this.props.caption)}}></div>
      </div>
    );
  }
}

export default Item