import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ChangeFilter, ChangeFilterName } from '../actions';
import Pokemon from '../components/pokemon';
import FilterType from '../components/filterType';
import PokemonFiltName from '../components/pokemonFiltName';
import loadImg from '../assets/loadImg.gif';

const mapStateToProps = state => ({
  pokemons: state.pokemons,
  filter: state.filter,
  filterName: state.filterName,
  loading: state.loading,
});

const mapDispatchToProps = {
  ChangeFilter,
  ChangeFilterName,
};

class PokemonsList extends Component {
  constructor(props) {
    super(props);
    const { filter, filterName } = props;
    if (filter === 'All' && filterName === '') {
      this.state = {
        actPage: 1,
      };
    } else {
      this.state = {
        actPage: 18,
      };
    }
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleFilterName = this.handleFilterName.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const { actPage } = this.state;
    if (actPage < 18) {
      if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500)) {
        this.setState({
          actPage: actPage + 1,
        });
      }
    }
  }

  handleFilterChange(typePkm) {
    const { ChangeFilter } = this.props;
    ChangeFilter(typePkm);
    let newPages = 1;
    if (typePkm !== 'All') {
      newPages = 18;
    }
    this.setState({
      actPage: newPages,
    });
  }

  handleFilterName(namePkm) {
    const { ChangeFilterName } = this.props;
    ChangeFilterName(namePkm);
    let newPages = 1;
    if (namePkm !== '') {
      newPages = 18;
    }
    this.setState({
      actPage: newPages,
    });
  }

  render() {
    const {
      pokemons, filter, loading, filterName,
    } = this.props;
    const { actPage } = this.state;
    return (
      <div>
        <div className="filter-container">
          <FilterType changeFilter={this.handleFilterChange} filter={filter} />
          <PokemonFiltName changeName={this.handleFilterName} filterName={filterName} />
        </div>
        { loading
          && (
          <div className="bg-load">
            <img className="image-load" src={loadImg} alt="loadingImage" />
          </div>
          )}
        <div className="cards-container">
          {
            !loading
            && pokemons.map(pokemon => (<Pokemon key={pokemon.name} pokemon={pokemon} />))
              .filter(item => (item.props.pokemon.types.includes(filter) || filter === 'All'))
              .filter(item => (item.props.pokemon.page <= actPage))
              .filter(item => (item.props.pokemon.name.includes(filterName)))
          }
        </div>
      </div>
    );
  }
}

PokemonsList.defaultProps = {
  pokemons: [],
};

PokemonsList.propTypes = {
  ChangeFilter: PropTypes.func.isRequired,
  ChangeFilterName: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  filter: PropTypes.string.isRequired,
  filterName: PropTypes.string.isRequired,
  pokemons: PropTypes.arrayOf(PropTypes.object),
};

export default connect(mapStateToProps, mapDispatchToProps)(PokemonsList);
