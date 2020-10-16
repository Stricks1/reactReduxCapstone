import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import PokemonsList from './containers/pokemonList';
import PokemonForm from './containers/formPokemon';
import PokemonsDetails from './containers/pokemonDetails';

function App() {
  return (
    <Router>
      <div className="header-Nav">
        <h1>Header for Pokemons</h1>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">About</Link>
          </li>
        </ul>
      </div>
      <div>
        <Switch>
          <Route path={"/pokemon/:number"}>
            <PokemonsDetails /> 
          </Route>
          <Route path='/'>
            <PokemonsList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
