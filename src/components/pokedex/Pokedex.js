import React from 'react';
import pokemonRequests from '../../firebaseRequests/requests';
import authRequests from '../../firebaseRequests/auth';
import PokeEntry from '../pokeEntry/PokeEntry';

import './Pokedex.css';

class Pokedex extends React.Component
{
  state =
  {
    pokemon: [],
    searchedPokemon: [],
    query: '',
  }

  search = e =>
  {
    let tempQuery = {...this.state.query};
    const query = e.target.value;
    tempQuery = query;
    this.setState({query: tempQuery});
  };

  saveNewPokemon = (key) =>
  {
    let newPokemon = {};
    const allPokemon = {...this.state.pokemon};
    Object.keys(allPokemon).forEach((pokemon) =>
    {
      if (allPokemon[pokemon].id === key)
      {
        newPokemon = allPokemon[pokemon];
        newPokemon.uid = authRequests.getUid();
      }
    });
    pokemonRequests.postRequest(newPokemon)
      .then(() =>
      {
        this.props.history.push('./Pokedex');
      })
      .catch((err) => { console.error(err); });
  }

  componentDidMount ()
  {
    pokemonRequests
      .getRequest()
      .then((pokemon) =>
      {
        this.setState({pokemon});
      })
      .catch((err) =>
      {
        console.error(err);
      });
  }

  searchPokemon = () =>
  {
    const newPokemonSearch = [];
    const pokeArray = this.state.pokemon;
    const query = this.state.query;
    console.error(pokeArray);
    for (let i = 0; i < pokeArray.length; i++)
    {
      if (pokeArray[i].name === query)
      {
        newPokemonSearch.push(pokeArray[i]);
        this.setState({searchedPokemon: newPokemonSearch});
      }
    }
  };

  render ()
  {
    const AllPokemonComponent = this.state.searchedPokemon.map((pokeEntry) =>
    {
      return (
        <PokeEntry
          key={pokeEntry.id}
          details={pokeEntry}
          saveNewPokemon={this.saveNewPokemon}
        />
      );
    });
    return (
      <div className="pokedex">
        <h2 className="text-center">Pokedex</h2>
        <div className="row pokemonContainer text-center">
          <h4>Search:</h4>
          <input className="col-xs-3 col-xs-offset-4" id="searchThing" placeholder="Search pokemon by name, number, or type" onChange={this.search}/>
          <img className="col-xs-1" onClick={this.searchPokemon} alt="search" src="http://www.stickpng.com/assets/images/580b57fcd9996e24bc43c325.png"/>
          {AllPokemonComponent}
        </div>
      </div>
    );
  }
}

export default Pokedex;
