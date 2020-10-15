import React from 'react';
import '../index.css';
import PropTypes from 'prop-types';

const Pokemon = ({ pokemon, remove }) => {
  const { name, image, types } = pokemon;
  return ( 
    <div className='pokemon-card'>
      <div className='d-flex-around'>
          {name.charAt(0).toUpperCase() + name.slice(1)}
          <button type="button" onClick={() => remove(pokemon)}>X</button>
      </div>
      <img src={image} alt={name}/>
      <div>Types</div>
      <ul>
        {
          types.map(type => (<li key={type}>{type}</li>))
        }
      </ul>
    </div>
  );
};

Pokemon.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    types: PropTypes.array.isRequired,
  }).isRequired,
  remove: PropTypes.func.isRequired,
};

export default Pokemon;
