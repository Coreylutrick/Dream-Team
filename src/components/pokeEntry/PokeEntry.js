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
      <li className="pokemon">
        <img src={image} alt={details.name}/>
        <h3>{details.name}</h3>
        <p>{details.description}</p>
        <button onClick={this.addClickEvent}>Add To Team</button>
      </li>
    );
  }
}

export default PokeEntry;
