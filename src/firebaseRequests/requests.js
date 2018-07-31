import axios from 'axios';
import constants from '../constants';

const getRequest = () =>
{
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/Pokedex.json`)
      .then(res => {
        const pokedex = [];
        if (res.data !== null) {
          Object.keys(res.data).forEach(fbKey => {
            res.data[fbKey].id = fbKey;
            pokedex.push(res.data[fbKey]);
          });
        }
        resolve(pokedex);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const postRequest = (pokemon) =>
{
  return new Promise((resolve, reject) =>
  {
    axios
      .post(`${constants.firebaseConfig.databaseURL}/MyTeam.json`, pokemon)
      .then((res) =>
      {
        resolve(res);
      })
      .catch((err) =>
      {
        reject(err);
      });
  });
};

const getRequest2 = (uid) =>
{
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/MyTeam.json?orderBy="uid"&equalTo="${uid}"`)
      .then(res => {
        const team = [];
        if (res.data !== null) {
          Object.keys(res.data).forEach(fbKey => {
            res.data[fbKey].id = fbKey;
            team.push(res.data[fbKey]);
          });
        }
        resolve(team);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const getSingleRequest = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/MyTeam/${id}.json`)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const deleteRequest = (pokemonId) =>
{
  return new Promise((resolve, reject) =>
  {
    axios
      .delete(`${constants.firebaseConfig.databaseURL}/MyTeam/${pokemonId}.json`)
      .then((res) =>
      {
        resolve(res);
      })
      .catch((err) =>
      {
        reject(err);
      });
  });
};

const putRequest = (pokemonId, updatedPokemon) =>
{
  return new Promise((resolve, reject) =>
  {
    axios
      .put(`${constants.firebaseConfig.databaseURL}/MyTeam/${pokemonId}.json`, updatedPokemon)
      .then((res) =>
      {
        resolve(res);
      })
      .catch((err) =>
      {
        reject(err);
      });
  });
};

export default {getRequest, postRequest, getRequest2, getSingleRequest, deleteRequest, putRequest};
