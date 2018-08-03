import React from 'react';

import './PokeEntry.css';

class PokeEntry extends React.Component
{
  addClickEvent = () =>
  {
    this.props.saveNewPokemon(this.props.details.id);
  }
  render ()
  {
    const {details} = this.props;
    const image = details.imgUrl;
    return (
      <li className="pokemonEntry text-center row">
        <div className="col-xs-4 col-xs-offset-4">
          <img src={image} alt={details.name}/>
          <h3>{details.name}</h3>
          <p className="pokeFont">#{details.number}</p>
          <button className="pokeFont" onClick={this.addClickEvent}>Add To Team</button>
        </div>
      </li>
    );
  }
}

export default PokeEntry;
