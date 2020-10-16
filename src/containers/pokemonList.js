import React from 'react';
import { connect } from 'react-redux';
import { ChangeMessage, RemovePokemon, ChangeFilter } from '../actions';
import Pokemon from '../components/pokemon';
import FilterType from '../components/filterType';

const mapStateToProps = state => ({
  pokemons: state.pokemons,
  filter: state.filter,
  loading: state.loading,
});

const mapDispatchToProps = {
  RemovePokemon,
  ChangeMessage,
  ChangeFilter,
};

const pokemonsList = ({
  pokemons, RemovePokemon, ChangeMessage, filter, ChangeFilter, loading
}) => {
  const handleRemovePokemon = book => {
    RemovePokemon(book);
    ChangeMessage('Pokemon Removed!');
  };

  const handleFilterChange = typePkm => {
    ChangeFilter(typePkm);
  };

  return (
    <div>
      <FilterType changeFilter={handleFilterChange} />
      { loading && 
        <div> Loading...</div> 
      }
      <div className='cards-container'>
        {
          !loading && 
          pokemons.map(pokemon => (<Pokemon key={pokemon.name} pokemon={pokemon} remove={handleRemovePokemon}/>))
           .filter(item => (item.props.pokemon.types.includes(filter) || filter === 'All'))
        }
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(pokemonsList);
