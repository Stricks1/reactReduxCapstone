import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import PokemonsList from './containers/pokemonList';
import PokemonsDetails from './containers/pokemonDetails';
import Message from './components/infoMessages';

function App() {
  return (
    <Router>
      <div className="header-Nav">
        <div className="flex-start">
          <Link className="clear-link" to="/">
            <h1 className="self-center color-black">Pokemon Catalog</h1>
          </Link>
          <ul className="self-center list-links">
            <li>
              <Link className="clear-link color-white" to="/">Home</Link>
            </li>
          </ul>
        </div>
        <Message />
      </div>
      <div>
        <Switch>
          <Route path="/pokemon/:number">
            <PokemonsDetails />
          </Route>
          <Route path="/">
            <PokemonsList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
