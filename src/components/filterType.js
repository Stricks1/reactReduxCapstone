import React from 'react';
import PropTypes from 'prop-types';

const FilterType = ({ changeFilter, filter }) => {
  const TYPES = ['normal',
    'fighting',
    'flying',
    'poison',
    'ground',
    'rock',
    'bug',
    'ghost',
    'steel',
    'fire',
    'water',
    'grass',
    'electric',
    'psychic',
    'ice',
    'dragon',
    'dark',
    'fairy',
  ];
  return (
    <div>
      <label htmlFor="selType">
        Pokemon Type:
        <select name="selType" id="selType" value={filter} onChange={e => changeFilter(e.target.value)}>
          {
            ['All', ...TYPES].map(item => (
              <option key={item} value={item}>{item}</option>
            ))
          }
        </select>
      </label>
    </div>
  );
};

FilterType.propTypes = {
  changeFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};

export default FilterType;
