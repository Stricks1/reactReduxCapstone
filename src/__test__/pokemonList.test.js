import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { render, cleanup } from '@testing-library/react';
import PokemonList from '../containers/pokemonList';
import combinedReducer from '../reducers';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

function renderWithStateEmpty(
  component,
  { initialState, store = createStore(combinedReducer, initialState) } = {},
) {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
  };
}

function renderWithStateLoaded(
  component,
  {
    initialState = {
      loading: false,
      pokemons: [{
        page: 1, number: 1, name: 'bulbasaur', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png', types: ['grass', 'poison'],
      }],
      filter: 'All',
    },
    store = createStore(combinedReducer, initialState),
  } = {},
) {
  return {
    ...render(
      <Provider store={store}>
        <BrowserRouter>
          {component}
          {' '}
        </BrowserRouter>
      </Provider>,
    ),
  };
}

it('renders correctly when loading', () => {
  const image = document.createElement('img');
  image.setAttribute('class', 'image-load');
  image.setAttribute('alt', 'loadingImage');
  image.setAttribute('src', 'loadImg.gif');
  const { getByTestId } = renderWithStateEmpty(<PokemonList />);
  expect(getByTestId('loading')).toMatchObject(image);
});

it('renders correctly pokemon on list when load done', () => {
  const { getByTestId } = renderWithStateLoaded(<PokemonList />);
  expect(getByTestId('pokemon-name')).toHaveTextContent('Bulbasaur');
});
