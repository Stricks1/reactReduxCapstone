import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import combinedReducer from './reducers';
import axios from 'axios';
import { CreatePokemon, ChangeLoading } from './actions';

const pokeIniti = {
  pokemons: [],
  filter: 'All',
  message: '',
};

const store = createStore(combinedReducer, pokeIniti);

let i;
const maxPkm = 893
for (i = 1; i <= maxPkm; i++) {
  const url = 'https://pokeapi.co/api/v2/pokemon/';
  const numberPkm = i;
  axios.get(url + numberPkm)
    .then(data => {
      let types = data.data.types.map(type => (type.type.name));
      store.dispatch(CreatePokemon(
        {
          number: numberPkm,
          name: data.data.name,
          image: data.data.sprites.front_default,
          types: types,
        },
      ))
      if (numberPkm === maxPkm) {
        store.dispatch(ChangeLoading(false));
      };
    }).catch(error => (console.log(error)));
}


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
