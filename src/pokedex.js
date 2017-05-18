import React, { Component } from 'react';
import './style.css';
import axios from 'axios';

class Pokedex extends Component {
  constructor(props) {
    super(props);
    this.state = { apiData: [], current: [] };
  }

  componentDidMount() {
    axios.get("http://pokeapi.co/api/v2/pokemon/?limit=151").then((allData) => {
        this.setState({ apiData: allData.data.results });
     });
  }

  getPokemonEntry(num) {
    axios.get(this.state.apiData[num].url).then((allData) => {        
        this.setState({ current: allData.data });
    });
  }

  createPokemonList() {
    this.indents = this.state.apiData.map((data, num) => {
        return this.createNumber(num + 1) + this.capitalize(data.name);
    });

    return this.results = this.indents.map((data, num) => {
        return (<p onClick={() => this.getPokemonEntry(num)} key={num + 1} className="monEntry">{data}</p>);
    });
  }

  createPokemonProfile() {
    this.indents = [];

    if(this.state.current.id !== undefined) {
      this.indents.push(<p key="a" className="monEntry">{this.createNumber(this.state.current.id) + this.capitalize(this.state.current.name)}</p>);
      this.indents.push(<p key="b" className="monEntry">Weight: {this.state.current.weight}</p>);
      this.indents.push(<p key="c" className="monEntry">Type(s): {this.checkData("Type", this.state.current.types.length)}</p>);
      this.indents.push(<p key="d" className="monEntry">Abilities: {this.checkData("Ability", this.state.current.abilities.length)}</p>);
    }
  
    return this.indents;
  }

  createPokemonMoveSet() {
    if(this.state.current.id !== undefined) {
        this.indents.push(<h3 key="e" className="monEntry">Move List:</h3>);

        return this.indents = this.state.current.moves.map((data, num) => {
          return (<li key={num + 1} className="monEntry"> {this.checkMoves("Moves", this.state.current.moves.length, num)}</li>);
        });
    }
  }
  
  createNumber(pokemonIndex) {
    this.fullString = '' + pokemonIndex;
    
    while (this.fullString.length < 3) {
        this.fullString = '0' + this.fullString;
    }

    return this.fullString += ". ";
  }

  capitalize(thisName) {
    return thisName.charAt(0).toUpperCase() + thisName.slice(1);
  }

  checkData(path, dataLength) {
    this.fullString = '';

    for (let i = 0; i < dataLength; i++) {
      this.sep = (i + 1 < dataLength) ? " / " : "";
      this.fullString += this.pickPath(path, this.state.current, i);
    }

    return this.fullString;
  }

  checkMoves(path, dataLength, i) {
    this.fullString = this.sep = '';
    return this.fullString += this.pickPath(path, this.state.current, i);
  }

  pickPath(chosenPathway, apiInfo, num) {
    switch(chosenPathway) {
        case "Type":
          return this.capitalize(apiInfo.types[num].type.name) + this.sep;
        case "Ability":
          return this.capitalize(apiInfo.abilities[num].ability.name) + this.sep;
        default: // Moves
          return this.capitalize(apiInfo.moves[num].move.name) + this.sep;
    }
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
          {this.createPokemonMoveSet()}
        </div>
      </div>
    );
  }
}

export default Pokedex;