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
        <span>Pokemon Type: </span>
        <select className="select-box margin-left" name="selType" id="selType" value={filter} onChange={e => changeFilter(e.target.value)}>
          {
            ['All', ...TYPES].map(item => (
              <option key={item} value={item}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </option>
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
