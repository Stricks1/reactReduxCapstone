import React from 'react';
import '../index.css';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

const Pokemon = ({ pokemon }) => {
  const {
    number, name, image, types,
  } = pokemon;
  return (
    <div>
      <Link className="pokemon-card" to={`/pokemon/${number}`} id="link-detail">
        <div className="d-flex-around title-card">
          <span>
            #
            {number}
          </span>
          <span data-testid="pokemon-name">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </span>
        </div>
        <img className="card-image" src={image} alt={name} />
        <div className="type-container">
          { types.length === 1
          && (
            <span className="type-title">Type</span>
          )}
          { types.length > 1
            && (
              <span className="type-title">Types</span>
            )}
          <ul className="type-list">
            {
              types.map(type => (<li key={type}>{type}</li>))
            }
          </ul>
        </div>
      </Link>
    </div>
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
