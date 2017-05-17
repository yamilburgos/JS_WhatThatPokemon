import React, { Component } from 'react';
import './style.css';
import axios from 'axios';

class Pokedex extends Component {
  constructor(props) {
    super(props);
    this.state = { apiData: [] };
  }

  componentDidMount() {
    axios.get("http://pokeapi.co/api/v2/pokemon/?limit=151").then((allData) => {
        this.setState({ apiData: allData.data.results });
     });
  }

  createPokemonList() {
    this.indents = [];

    for (var i = 0; i < this.state.apiData.length; i++) {      
      this.name = this.state.apiData[i].name;
      this.final = this.createNumber(i + 1) + this.capitalizeWord(this.name);
      this.indents.push(<p key={i + 1} className="monEntry">{this.final}</p>);
    }

    return this.indents;
  }

  getPokemonEntry() {

  }

  render() {
    return (
      <div>
        <h1 className="title">Who's that Pokémon?</h1>
        <div className="columns monList">
          {this.createPokemonList()}
        </div>

        <div className="columns monProfile">
          <p className="monEntry">Name: </p>
          <p className="monEntry">Weight: </p>
          <p className="monEntry">Abilities: </p>
        </div>
      </div>
    );
  }

  createNumber(pokemonIndex) {
    var fullString = '' + pokemonIndex;
    
    while (fullString.length < 3) {
        fullString = '0' + fullString;
    }

    return fullString += ". ";
  }

  capitalizeWord(thisName) {
    return thisName.charAt(0).toUpperCase() + thisName.slice(1);
  }
}

export default Pokedex;