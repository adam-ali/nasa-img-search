import React, { Component } from 'react'
import { BrowserRouter as Router, Link } from "react-router-dom";

export default class Search extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      searchType: 'image',
      searchText: '',
      searchResults: []
    }

    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.search = this.search.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.navigate = this.navigate.bind(this);
  }
  handleInputChange(event){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  handleCheckboxChange(event) {
    this.setState({
      searchType: event.target.value
    });
  }
  search(e){
    e.preventDefault();
    fetch(`https://images-api.nasa.gov/search?q=${this.state.searchText}&media_type=${this.state.searchType}`,{
      method: 'GET',
    })
    .then(response => response.json())
    .then(body => {

      body.collection.items.forEach(element => {
        fetch(element.href,{
          method: 'GET',
        })
        .then(response => response.json())
        .then(body => {
          let dataObj = {
            data: element.data[0],
            imgUrls: body
          }

          this.setState({
            searchResults: [...this.state.searchResults, dataObj]
          })

        })

      });

       
    })
  }
  navigate(){
    console.log('clicked')

  }
  render() {
    console.log(this.state)
    return (
      <div>
        
        <div className='form-container'>
          <form onSubmit={this.search} className='form'>
            <h1 className='form__label'>NASA Search</h1>


            <input placeholder='search item' className='form__input' required name='searchText' onChange={this.handleInputChange}></input>

              <label>
                <input name="isChecked" 
                      type="radio" 
                      value="image"
                      checked={this.state.searchType === 'image'} 
                      onChange={this.handleCheckboxChange}/>
                Image
              </label>
              <label>
                <input type="radio" 
                      name="isChecked"
                      value="audio"
                      checked={this.state.searchType === 'audio'} 
                      onChange={this.handleCheckboxChange} />
                Audio
              </label>

            <button type='submit'>submit</button>
          </form>
        </div>

        <div className='container'>
          {this.state.searchResults.map((item,i)=>{
            let img = item.imgUrls.find(i=>RegExp('\\bthumb\\b').test(i));
            let url_id = item.data.nasa_id
            return (
              <div key={i} className='item'>
                <Link to={{ pathname:`/asset/${url_id}`,state: {data: item} }}>aaaaa</Link>
                
                <img src={img} onClick={this.navigate} />
              </div>
            )
          })}
        </div>
        
      </div>
    )
  }
}
