import React, { Component, } from 'react';
import { connect } from 'react-redux';
import { ChangeDetail, ChangeLoading } from '../actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => ({
  pokemons: state.pokemons,
});

const mapDispatchToProps = {
  ChangeDetail,
  ChangeLoading,
};

class PokemonsDetails extends Component {  
  constructor(props) {
    super(props);
    ChangeLoading(true);
  }

  componentDidMount() {
    const { number } = this.props.match.params;
    console.log(number);
  }
  
  render() {
    return (
      <div className="pok-details">
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PokemonsDetails));
