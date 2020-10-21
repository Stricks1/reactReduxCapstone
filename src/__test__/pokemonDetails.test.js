import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { createStore } from 'redux';
import { render, cleanup } from '@testing-library/react';
import PokemonDetails from '../containers/pokemonDetails';
import combinedReducer from '../reducers';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

function renderWithStateLoading(
  component,
  {
    initialState = {
      loading: true,
      pokemons: [{
        page: 1, number: 1, name: 'bulbasaur', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png', types: ['grass', 'poison'],
      }],
      filter: 'All',
      detail: {
        number: 1,
        namePkm: 'bulbasaur',
        baseExperience: 64,
        height: 7,
        weight: 69,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        captureRate: 45,
        types: ['grass', 'poison'],
        text: 'While it is young, it uses the nutrients that arestored in the seeds on its back in order to grow.',
        habitat: 'grassland',
        growthRate: 'medium-slow',
        shape: 'quadruped',
        color: 'green',
        evolution: [],
      },
    },
    store = createStore(combinedReducer, initialState),
    path = '/pokemon/:number',
    route = '/pokemon/1',
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {},
) {
  return {
    ...render(
      <Provider store={store}>
        <Router history={history}>
          <Route path={path}>
            {component}
            {' '}
          </Route>
        </Router>
      </Provider>,
    ),
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
      detail: {
        number: 1,
        namePkm: 'bulbasaur',
        baseExperience: 64,
        height: 7,
        weight: 69,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        captureRate: 45,
        types: ['grass', 'poison'],
        text: 'While it is young, it uses the nutrients that arestored in the seeds on its back in order to grow.',
        habitat: 'grassland',
        growthRate: 'medium-slow',
        shape: 'quadruped',
        color: 'green',
        evolution: [],
      },
    },
    store = createStore(combinedReducer, initialState),
    path = '/pokemon/:number',
    route = '/pokemon/1',
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {},
) {
  return {
    ...render(
      <Provider store={store}>
        <Router history={history}>
          <Route path={path}>
            {component}
            {' '}
          </Route>
        </Router>
      </Provider>,
    ),
  };
}

it('renders correctly when loading', () => {
  const image = document.createElement('img');
  image.setAttribute('class', 'margin-top-30 image-load');
  image.setAttribute('alt', 'loadingImage');
  image.setAttribute('src', 'loadImg.gif');
  const { getByTestId } = renderWithStateLoading(<PokemonDetails />);
  expect(getByTestId('loading-det')).toMatchObject(image);
});

it('renders correctly pokemon on list when load done', () => {
  const { getByTestId } = renderWithStateLoaded(<PokemonDetails />);
  expect(getByTestId('pokemon-height')).toHaveTextContent('7');
  expect(getByTestId('pokemon-weight')).toHaveTextContent('69');
});
