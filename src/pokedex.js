import React, { Component } from 'react';
import './style.css';
import axios from 'axios';

class Pokedex extends Component {
  constructor(props) {
    super(props);

    this.state = { apiData: [] };
  }

  indexer(monIndex) {
    this.array = [];
    var newString = '' + monIndex;
    
    while (newString.length < 3) {
        newString = '0' + newString;
    }

    newString += ".";   
    return newString;
  }

  componentDidMount() {
    axios.get("http://pokeapi.co/api/v2/pokemon/?limit=151").then((allData) => {
        const results = allData.data.results;
        console.log(results);
        this.setState({ apiData: results });
        //this.creatingNameLists();
     });
  }

  creatingNameLists() {
    console.log(this.state);
    for (var i = 0; i < this.state.apiData.length; i++) {
      const name = this.state.apiData[i].name;
    //  console.log(name);
    }

   // return <p className="monEntry">{name}</p>;
  }



  render() {
    var indents = [];

    for (var i = 0; i < this.state.apiData.length; i++) {
      const name = this.state.apiData[i].name;
      indents.push(<p key={i+1} className="monEntry">{this.indexer(i+1)} {name}</p>);
    //  console.log(name);
    }

    return (
      <div>
        <h1 className="title">Who's that Pokémon?</h1>
        <div className="columns monList">
          {indents}
          <p className="monEntry">{this.indexer(1)} Bulbasaur</p>
        </div>

        <div className="columns monProfile">

        </div>
      </div>
    );
  }
}

export default Pokedex;