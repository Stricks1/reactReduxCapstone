import React from 'react';
import '../index.css';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

const Pokemon = ({ pokemon }) => {
  const {
    number, name, image, types,
  } = pokemon;
  return (
    <Link to={`/pokemon/${number}`} id="link-detail">
      <div className="pokemon-card">
        <div className="d-flex-around">
          #
          {number}
          {' '}
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </div>
        <img src={image} alt={name} />
        <div>Types</div>
        <ul>
          {
            types.map(type => (<li key={type}>{type}</li>))
          }
        </ul>
      </div>
    </Link>
  );
};

Pokemon.propTypes = {
  pokemon: PropTypes.shape({
    number: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    types: PropTypes.arrayOf.isRequired,
  }).isRequired,
};

export default withRouter(Pokemon);
