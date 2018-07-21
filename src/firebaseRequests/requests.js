import axios from 'axios';
import constants from '../constants';

const getRequest = () =>
{
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/Pokedex.json`)
      .then(res => {
        const pokemon = [];
        if (res.data !== null) {
          Object.keys(res.data).forEach(fbKey => {
            res.data[fbKey].id = fbKey;
            pokemon.push(res.data[fbKey]);
          });
        }
        resolve(pokemon);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default getRequest;
