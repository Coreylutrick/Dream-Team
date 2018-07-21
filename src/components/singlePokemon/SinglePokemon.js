import React from 'react';

import pokemonRequests from '../../firebaseRequests/requests';

import './SinglePokemon.css';

class SinglePokemon extends React.Component
{
  state =
  {
    pokemon: [],
  }

  componentDidMount ()
  {
    const firebaseId = this.props.match.params.id;
    pokemonRequests
      .getSingleRequest(firebaseId)
      .then((pokemon) =>
      {
        this.setState({pokemon});
      })
      .catch((err) =>
      {
        console.error(err);
      });
  }

  deletePokemonClick = () =>
  {
    const firebaseId = this.props.match.params.id;
    pokemonRequests
      .deleteRequest(firebaseId)
      .then(() =>
      {
        this.props.history.push('/myTeam');
      })
      .catch((err) =>
      {
        console.error(err);
      });
  };

  render ()
  {
    const mySinglePokemon = this.state.pokemon;
    return (
      <div>
        <img src={mySinglePokemon.imgUrl} alt={mySinglePokemon.name}/>
        <button onClick={this.deletePokemonClick}>X</button>
      </div>
    );
  }
};

export default SinglePokemon;
