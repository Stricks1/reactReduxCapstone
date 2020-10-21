import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PokemonFiltName extends Component {
  constructor(props) {
    super(props);
    this.name = React.createRef();
  }

  render() {
    const { changeName, filterName } = this.props;
    return (
      <div className="margin-y">
        <label htmlFor="txtName">
          Pokemon Name:
          <input data-testid="filter-name" className="margin-left" type="text" id="txtName" name="txtName" value={filterName} onChange={() => changeName(this.name.value.toLowerCase())} ref={input => { (this.name = input); }} placeholder="Pokemon name..." />
        </label>
      </div>
    );
  }
}

PokemonFiltName.propTypes = {
  changeName: PropTypes.func.isRequired,
  filterName: PropTypes.string.isRequired,
};

export default PokemonFiltName;
