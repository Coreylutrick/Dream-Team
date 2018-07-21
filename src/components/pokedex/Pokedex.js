import React from 'react';
import pokemonRequests from '../../firebaseRequests/requests';
import authRequests from '../../firebaseRequests/auth';
import pokeEntry from '../pokeEntry/PokeEntry';

import './Pokedex.css';

class Pokedex extends React.Component
{
  state = {
    pokemon: [],
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
