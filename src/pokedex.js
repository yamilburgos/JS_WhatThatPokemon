import React, { Component } from 'react';
import './style.css';
import axios from 'axios';

class Pokedex extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      apiData: [], 
      entry: "", 
      weight: "", 
      type: "",
      ability: ""
    };
  }

  componentDidMount() {
    axios.get("http://pokeapi.co/api/v2/pokemon/?limit=151").then((allData) => {
        this.setState({ apiData: allData.data.results });
     });
  }

  createPokemonList() {
    this.indents = [];

    for (var i = 0; i < this.state.apiData.length; i++) {
      this.final = this.createNumber(i + 1) +  this.capitalize(this.state.apiData[i].name);

      this.indents.push(<p onClick={() => this.getPokemonEntry()} key={i + 1} className="monEntry">{this.final}</p>);
    }

    return this.indents;
  }

  getPokemonEntry() {
    let num = 0;

    axios.get(this.state.apiData[num].url).then((allData) => {
        console.log(allData.data, allData.data.types[0].type.name);
        
        this.setState({ 
          entry: this.createNumber(allData.data.id) + this.capitalize(allData.data.name), 
          type: "Type(s): " + this.checkType(allData.data, allData.data.types.length),
          ability: "Abilties: " + this.checkAbility(allData.data, 3),
          weight: "Weight: " + allData.data.weight
        });
    });
  }
  
  render() {
    return (
      <div>
        <h1 className="title">Who's that Pokémon?</h1>
        <div className="columns monList">
          {this.createPokemonList()}
        </div>

        <div className="columns monProfile">
          <p className="monEntry">{this.state.entry}</p>
          <p className="monEntry">{this.state.type}</p>
          <p className="monEntry">{this.state.weight}</p>
          <p className="monEntry">{this.state.ability}</p>
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

  capitalize(thisName) {
    return thisName.charAt(0).toUpperCase() + thisName.slice(1);
  }

  checkType(typeData, dataLength) {
    var fullString = '';
    
    for (var i = 0; i < dataLength; i++) {
      var sep = (i + 1 < dataLength) ? " / " : "";
      fullString += this.capitalize(typeData.types[i].type.name) + sep;
    }

    return fullString;
  }

  checkAbility(typeData, dataLength) {
    var fullString = '';
    
    for (var i = 0; i < dataLength; i++) {
      var sep = (i + 1 < dataLength) ? " / " : "";
    //  fullString += this.capitalize(typeData.types[i].type.name) + sep;
    }

    return fullString;
  }
}

export default Pokedex;