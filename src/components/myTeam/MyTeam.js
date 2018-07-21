import React from 'react';
import pokemonRequests from '../../firebaseRequests/requests';
import authRequests from '../../firebaseRequests/auth';

import './MyTeam.css';

class MyTeam extends React.Component
{
  state = {
    pokemon: [],
  }

  componentDidMount ()
  {
    pokemonRequests
      .getRequest2(authRequests.getUid())
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
    const myTeamComponents = this.state.pokemon.map((pokemon) =>
    {
      const singlePokemonClickEvent = () =>
      {
        this.props.history.push(`/pokemon/${pokemon.id}`);
      };
      return (
        <button
          key={pokemon.id}
          className="teamPokemon"
          onClick={singlePokemonClickEvent}
        >
          <img src={pokemon.imgUrl} alt={pokemon.name}/>
        </button>
      );
    });
    return (
      <div>
        <h2>My Team</h2>
        <div>{myTeamComponents}</div>
      </div>
    );
  }
}

export default MyTeam;