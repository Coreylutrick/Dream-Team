import React from 'react';
import {Button, Modal} from 'react-bootstrap';

import pokemonRequests from '../../firebaseRequests/requests';

import './SinglePokemon.css';

class SinglePokemon extends React.Component
{
  state =
  {
    pokemon: [],
    show: false,
    nickname: '',
  }

  nicknameUpdate = e =>
  {
    let tempNickname = {...this.state.nickname};
    const nickname = e.target.value;
    tempNickname = nickname;
    this.setState({nickname: tempNickname});
  };

  saveNickname = (e) =>
  {
    const pokemonId = this.props.match.params.id;
    e.preventDefault();
    const updatedPokemon = this.state.pokemon;
    updatedPokemon.nickname = this.state.nickname;
    pokemonRequests.putRequest(pokemonId, updatedPokemon)
      .then(() =>
      {
        this.props.history.push('/pokemon/:id');
      })
      .catch((err) =>
      {
        console.error(err);
      });
  };

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

  constructor (props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose () {
    this.setState({ show: false });
  }

  handleShow () {
    this.setState({ show: true });
  }

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
        <div className="text-center">
          <h3>Nickname:</h3><p>{mySinglePokemon.nickname}</p>
        </div>
        <div className="col-xs-4 col-xs-offset-4 text-center">
          <h4>{mySinglePokemon.description}</h4>
        </div>
        <button onClick={this.deletePokemonClick}>X</button>
        <button onClick={this.handleShow}>Nickname</button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title>Nickname</Modal.Title>
          </Modal.Header>

          <Modal.Body><input placeholder="Nickname your pokemon" onChange={this.nicknameUpdate}/></Modal.Body>

          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
            <Button bsStyle="primary" onClick={this.saveNickname}>Save changes</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
};

export default SinglePokemon;
