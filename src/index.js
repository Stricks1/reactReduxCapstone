import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import combinedReducer from './reducers';

const pokeIniti = {
  pokemons: [
    {
      name: 'pikachu',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
      types: ['electric'],
    },
    {
      name: 'slowpoke',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/79.png',
      types: ['water', 'psychic'],
    },
  ],
  filter: 'All',
  message: '',
};

const store = createStore(combinedReducer, pokeIniti);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
