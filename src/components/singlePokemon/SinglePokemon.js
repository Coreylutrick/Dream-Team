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
        <h1 className="text-center">{mySinglePokemon.name}</h1>
        <div className="row singlePokemonContainer">
          <div className="col-xs-2 col-xs-offset-2">
            <h4>Base Stats:</h4>
            <ul>
              <li><strong>Hp:</strong> {mySinglePokemon.hp}</li>
              <li><strong>Attack:</strong> {mySinglePokemon.attack}</li>
              <li><strong>Defense:</strong> {mySinglePokemon.defense}</li>
              <li><strong>Sp. Attack:</strong> {mySinglePokemon.spAtk}</li>
              <li><strong>Sp. Defense:</strong> {mySinglePokemon.spDef}</li>
              <li><strong>Speed:</strong>{mySinglePokemon.spd}</li>
            </ul>
            <h3>Total: {mySinglePokemon.total}</h3>
          </div>
          <div>
            <img className="col-xs-4 pokeImg" src={mySinglePokemon.imgUrl} alt={mySinglePokemon.name}/>
          </div>
        </div>
        <div className="col-xs-4 col-xs-offset-4 text-center">
          <h4>{mySinglePokemon.description}</h4>
        </div>
        <button onClick={this.deletePokemonClick}>X</button>
        <button>Nickname</button>
      </div>
    );
  }
};

export default SinglePokemon;
