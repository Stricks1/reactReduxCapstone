import React from 'react';
import PokemonsList from './containers/pokemonList';
import PokemonForm from './containers/formPokemon';

function App() {
  return (
    <div className="App">
      <h1>Show Pokemons</h1>
      <PokemonForm /> 
      <PokemonsList />
    </div>
  );
}

export default App;
