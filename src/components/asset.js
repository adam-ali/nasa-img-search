import React, { Component } from 'react'

export default class Asset extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }
  
  render() {
    console.log(this.props.location.state)
    let title = this.props.location.state.data.data.title;
    let description = this.props.location.state.data.data.description;
    return (
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    )
  }
}
