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
  }

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

  render ()
  {
    const AllPokemonComponent = this.state.pokemon.map((pokeEntry) =>
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
        <h2>Pokedex</h2>
        <div className="row pokemonContainer">
          {AllPokemonComponent}
        </div>
      </div>
    );
  }
}

export default Pokedex;
