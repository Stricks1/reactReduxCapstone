import React, { Component, } from 'react';
import { connect } from 'react-redux';
import { ChangeFilter } from '../actions';
import Pokemon from '../components/pokemon';
import FilterType from '../components/filterType';

const mapStateToProps = state => ({
  pokemons: state.pokemons,
  filter: state.filter,
  loading: state.loading,
});

const mapDispatchToProps = {
  ChangeFilter,
};

class pokemonsList extends Component {  
  constructor(props) {
    super(props);
    this.state = {
      actPage: 1,
    };
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if (this.state.actPage < 18) {
      if((window.innerHeight + window.scrollY) >= (document.body.offsetHeight -500)) {
        this.setState({
          actPage: this.state.actPage + 1,
        });
      }
    }
  }

  handleFilterChange = typePkm => {
    const { ChangeFilter } = this.props;
    ChangeFilter(typePkm);
  };

  render() {
    const { pokemons, filter, loading } = this.props;
    return (
      <div>
        <FilterType changeFilter={this.handleFilterChange} />
        { loading && 
          <div> Loading... {this.state.actPage}</div> 
        }
        <div className='cards-container'>
          {
            !loading && 
            pokemons.map(pokemon => (<Pokemon key={pokemon.name} pokemon={pokemon}/>))
             .filter(item => (item.props.pokemon.types.includes(filter) || filter === 'All'))
             .filter(item => (item.props.pokemon.page <= this.state.actPage))
          }
        </div>
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(pokemonsList);
