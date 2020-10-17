import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import axios from 'axios';
import combinedReducer from './reducers';
import App from './App';
import { CreatePokemon, ChangeLoading, ChangeMessage } from './actions';

const store = createStore(combinedReducer);

let i;
const maxPkm = 893;
for (i = 1; i <= maxPkm; i += 1) {
  const url = 'https://pokeapi.co/api/v2/pokemon/';
  const numberPkm = i;
  axios.get(url + numberPkm)
    .then(data => {
      const types = data.data.types.map(type => (type.type.name));
      store.dispatch(CreatePokemon(
        {
          page: (numberPkm / 50),
          number: numberPkm,
          name: data.data.name,
          image: data.data.sprites.front_default,
          types,
        },
      ));
      if (numberPkm === maxPkm) {
        store.dispatch(ChangeLoading(false));
      }
    }).catch(() => (store.dispatch(ChangeMessage('Unexpected Error at API, try reload'))));
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
