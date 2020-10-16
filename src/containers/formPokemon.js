import React, { Component, } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CreatePokemon, ChangeMessage } from '../actions';
import axios from 'axios';

class PokemonForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
    this.name = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  apiCall(pkmName) {
    const { CreatePokemon, ChangeMessage } = this.props;
    const url = 'https://pokeapi.co/api/v2/pokemon/';
    axios.get(url + pkmName.value.toLowerCase())
      .then(data => {
        let types = data.data.types.map(type => (type.type.name));
        CreatePokemon(
          {
            number: data.data.id,
            name: data.data.name,
            image: data.data.sprites.front_default,
            types: types,
          },
        ); 
        ChangeMessage('Pokemon added');
      }).catch(error => (ChangeMessage('Pokemon not found!')));
  }

  handleChange() {
    this.setState({
      name: this.name.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { name } = this.state;
    const { pokemons, ChangeMessage } = this.props;
    let callApi = true;

    if (name.trim().length === 0) {
      return;
    }
    pokemons.forEach(pokemon => {
      if (pokemon.name === name.toLowerCase()) {
        ChangeMessage('Pokemon already on the list!')
        callApi = false;
      } 
    });
    if (callApi) {
      this.apiCall(this.name);
    }
    e.target.reset();
  }

  render() {
    const { message } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="txtName">
            ADD NEW POKEMON
            <input type="text" id="txtName" name="txtName" onChange={this.handleChange} ref={input => { (this.name = input); }} placeholder="Pokemon name..." />
          </label>
          <button type="submit">
            Add Pokemon
          </button>
          <span>{message}</span>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  pokemons: state.pokemons,
  message: state.message,
});
 
const mapDispatchToProps = {
  CreatePokemon,
  ChangeMessage,
};

PokemonForm.propTypes = {
  CreatePokemon: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PokemonForm);
