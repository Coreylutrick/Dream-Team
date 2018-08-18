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
        <div className="row singlePokemonContainer box">
          <div>
            <img className="col-xs-4 col-xs-offset-4 pokeImg" src={mySinglePokemon.imgUrl} alt={mySinglePokemon.name}/>
          </div>
          <div className="col-xs-2">
            <h3 className="red">Base Stats:</h3>
            <ul>
              <li><strong>Hp:</strong>{mySinglePokemon.hp}</li>
              <li><strong>Attack:</strong>{mySinglePokemon.attack}</li>
              <li><strong>Defense:</strong>{mySinglePokemon.defense}</li>
              <li><strong>Sp. Attack:</strong>{mySinglePokemon.spAtk}</li>
              <li><strong>Sp. Defense:</strong>{mySinglePokemon.spDef}</li>
              <li><strong>Speed:</strong>{mySinglePokemon.spd}</li>
            </ul>
            <h4>Total: {mySinglePokemon.total}</h4>
          </div>
          <div className="row">
            <div className="text-center col-xs-12">
              <h3 className="red">Nickname:</h3><p>{mySinglePokemon.nickname}</p>
            </div>
          </div>
          <div className="col-xs-12 text-center">
            <h5>{mySinglePokemon.description}</h5>
          </div>
          <div className="row">
            <div className="col-xs-2">
              <h3>Height:</h3>
              <p>{mySinglePokemon.height}</p>
            </div>
            <div className="col-xs-2 col-xs-offset-1">
              <h3>Weight:</h3>
              <p>{mySinglePokemon.weight}</p>
            </div>
            <div className="col-xs-2 col-xs-offset-1">
              <h3>Abilities:</h3>
              <ul>
                <li>{mySinglePokemon.ability1}</li>
                <li>{mySinglePokemon.ability2}</li>
              </ul>
            </div>
            <div className="col-xs-2 col-xs-offset-1">
              <h3>Type:</h3>
              <ul>
                <li>{mySinglePokemon.type1}</li>
                <li>{mySinglePokemon.type2}</li>
              </ul>
            </div>
          </div>
          <div className="row">
            <button className="btn btn-danger col-xs-3 col-xs-offset-3" onClick={this.deletePokemonClick}>Release Pokemon</button>
            <button className="btn btn-danger col-xs-3" onClick={this.handleShow}>Nickname</button>
          </div>
        </div>

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
