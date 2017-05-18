import React, { Component } from 'react';
import './style.css';
import axios from 'axios';

class Pokedex extends Component {
  constructor(props) {
    super(props);
    this.state = { apiData: [], current: [], };
  }

  componentDidMount() {
    axios.get("http://pokeapi.co/api/v2/pokemon/?limit=151").then((allData) => {
        console.log(allData.data);
        this.setState({ apiData: allData.data.results });
     });
  }

  getPokemonEntry() {
    let num = 14 + 1;

    axios.get(this.state.apiData[num].url).then((allData) => {        
        this.setState({ current: allData.data });
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

  createPokemonProfile() {
    console.log(this.createNumber(this.state.current.id), (this.state.current));
    this.indents = [];

    if(this.state.current.id !== undefined) {
      this.indents.push(<p key="a" className="monEntry">{this.createNumber(this.state.current.id) + this.capitalize(this.state.current.name)}</p>);
      this.indents.push(<p key="b" className="monEntry">Weight: {this.state.current.weight}</p>);
      this.indents.push(<p key="c" className="monEntry">Type(s): {this.checkData("Type", this.state.current, this.state.current.types.length)}</p>);
      this.indents.push(<p key="d" className="monEntry">Abilities: {this.checkData("Ability", this.state.current, this.state.current.abilities.length)}</p>);
      this.indents.push(<p key="e" className="monEntry">All Moves: {this.checkData("Moves", this.state.current, this.state.current.moves.length)}</p>);
    }
  
    return this.indents;
  }
  
  render() {
    return (
      <div>
        <h1 className="title">Who's that Pokémon?</h1>
        <div className="columns monList">
          {this.createPokemonList()}
        </div>

        <div className="columns monProfile">
          {this.createPokemonProfile()}
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

  checkData(path, typeData, dataLength) {
    var fullString = '';

    for (var i = 0; i < dataLength; i++) {
      var sep = (i + 1 < dataLength) ? " / " : "";
      fullString += this.pickPath(path, typeData, i, sep);
    }

    return fullString;
  }

  pickPath(chosenPathway, apiInfo, i, sep) {
    switch(chosenPathway) {
        case "Type":
          return this.capitalize(apiInfo.types[i].type.name) + sep;
        case "Ability":
          return this.capitalize(apiInfo.abilities[i].ability.name) + sep;
        default: // Moves
          return this.capitalize(apiInfo.moves[i].move.name) + sep;
    }
  }
}

export default Pokedex;