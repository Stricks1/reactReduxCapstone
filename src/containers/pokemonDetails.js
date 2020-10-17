import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { ChangeDetail, ChangeLoading, ChangeMessage } from '../actions';

const mapStateToProps = state => ({
  pokemons: state.pokemons,
  detail: state.detail,
});

const mapDispatchToProps = {
  ChangeDetail,
  ChangeLoading,
  ChangeMessage,
};

class PokemonsDetails extends Component {
  constructor(props) {
    super(props);
    ChangeLoading(true);
  }

  componentDidMount() {
    const {
      match: {
        params: { number },
      },
    } = this.props;
    const {
      ChangeDetail, ChangeLoading, pokemons, ChangeMessage,
    } = this.props;
    ChangeDetail({});
    ChangeLoading(true);
    if (pokemons.length === 0) {
      return;
    }
    const url = 'https://pokeapi.co/api/v2/pokemon/';
    const url2 = 'https://pokeapi.co/api/v2/pokemon-species/';
    axios.get(url + number)
      .then(data => {
        axios.get(url2 + number)
          .then(data2 => {
            let chainUrl = 'unknown';
            if (data2.data.evolution_chain) {
              chainUrl = data2.data.evolution_chain.url;
            }
            if (chainUrl !== 'unknown') {
              axios.get(chainUrl)
                .then(dataEvolution => {
                  let evChain = dataEvolution.data.chain;
                  const evolution = [];
                  while (evChain !== undefined) {
                    const evName = evChain.species.name;
                    const evNumbA = evChain.species.url.split('/');
                    const evNumb = evNumbA[evNumbA.length - 2];
                    evolution.push({
                      name: evName,
                      evNumb,
                      imageEv: pokemons[evNumb - 1].image,
                    });
                    evChain = evChain.evolves_to;
                    [evChain] = evChain;
                  }
                  const types = data.data.types.map(type => (type.type.name));
                  const texts = data2.data.flavor_text_entries.filter(item => (item.language.name === 'en'))
                    .map(text => (text.flavor_text));
                  const txtSize = texts.length;
                  const singleTxt = texts[Math.floor(Math.random() * txtSize)];
                  let habitatName = 'unknown';
                  if (data2.data.habitat) {
                    habitatName = data2.data.habitat.name;
                  }
                  let growthRate = 'unknown';
                  if (data2.data.growth_rate) {
                    growthRate = data2.data.growth_rate.name;
                  }
                  let shape = 'unknown';
                  if (data2.data.shape) {
                    shape = data2.data.shape.name;
                  }
                  ChangeDetail(
                    {
                      number: data.data.id,
                      namePkm: data.data.name,
                      baseExperience: data.data.base_experience,
                      height: data.data.height,
                      weight: data.data.weight,
                      image: data.data.sprites.front_default,
                      captureRate: data2.data.capture_rate,
                      types,
                      text: singleTxt,
                      habitat: habitatName,
                      growthRate,
                      shape,
                      color: data2.data.color.name,
                      evolution,
                    },
                  );
                  ChangeLoading(false);
                }).catch(error => (ChangeMessage(`API error ${error}`)));
            } else {
              const types = data.data.types.map(type => (type.type.name));
              const texts = data2.data.flavor_text_entries.filter(item => (item.language.name === 'en'))
                .map(text => (text.flavor_text));
              const txtSize = texts.length;
              const singleTxt = texts[Math.floor(Math.random() * txtSize)];
              let habitatName = 'unknown';
              if (data2.data.habitat) {
                habitatName = data2.data.habitat.name;
              }
              let growthRate = 'unknown';
              if (data2.data.growth_rate) {
                growthRate = data2.data.growth_rate.name;
              }
              let shape = 'unknown';
              if (data2.data.shape) {
                shape = data2.data.shape.name;
              }
              ChangeDetail(
                {
                  number: data.data.id,
                  namePkm: data.data.name,
                  baseExperience: data.data.base_experience,
                  height: data.data.height,
                  weight: data.data.weight,
                  image: data.data.sprites.front_default,
                  captureRate: data2.data.capture_rate,
                  types,
                  text: singleTxt,
                  habitat: habitatName,
                  growthRate,
                  shape,
                  color: data2.data.color.name,
                  evolution: [{
                    name: data.data.name,
                    evNumb: data.data.id,
                    imageEv: data.data.sprites.front_default,
                  }],
                },
              );
            }
          }).catch(error => (ChangeMessage(`API error ${error}`)));
      }).catch(error => (ChangeMessage(`API error ${error}`)));
  }

  render() {
    const { pokemons, detail, loading } = this.props;
    if (pokemons.length === 0) {
      return <Redirect to="/" />;
    }
    return (
      <>
        { loading
          && <div> Loading Details...</div>}
        { !loading
          && (
          <>
            <div className="pok-details" key={`#${detail.number} ${detail.namePkm}`}>
              <div>
                Name:
                {' '}
                {`#${detail.number} ${detail.namePkm}`}
                Base Exp:
                {' '}
                {detail.baseExperience}
                height:
                {' '}
                {detail.height}
                weight:
                {' '}
                {detail.weight}
                <img src={detail.image} alt={detail.namePkm} />
                captureRate:
                {' '}
                {detail.captureRate}
                text:
                {' '}
                {detail.text}
                <div>
                  habitat:
                  {' '}
                  {detail.habitat}
                  growth_rate:
                  {' '}
                  {detail.growthRate}
                  shape:
                  {' '}
                  {detail.shape}
                  color:
                  {' '}
                  {detail.color}
                </div>
                <div>Types</div>
                <ul>
                  {
                    detail.types
                    && detail.types.map(type => (<li key={type}>{type}</li>))
                  }
                </ul>
              </div>
            </div>
            <div className="evolution-path">
              Evolution chain:
              {
                 detail.evolution && detail.evolution.map(item => (
                   <div key={item.evNumb}>
                     <div>
                       {`${item.evNumb} `}
                       {item.name}
                     </div>
                     <div>
                       <img src={item.imageEv} alt={item.name} />
                     </div>
                   </div>
                 ))
              }
            </div>
          </>
          )}
      </>
    );
  }
}

PokemonsDetails.defaultProps = {
  pokemons: [],
  detail: {},
  loading: false,
};

PokemonsDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      number: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  ChangeLoading: PropTypes.func.isRequired,
  ChangeDetail: PropTypes.func.isRequired,
  pokemons: PropTypes.arrayOf(PropTypes.object),
  detail: PropTypes.shape({
    number: PropTypes.number,
    namePkm: PropTypes.string,
    baseExperience: PropTypes.number,
    height: PropTypes.number,
    weight: PropTypes.number,
    image: PropTypes.string,
    captureRate: PropTypes.number,
    types: PropTypes.arrayOf(PropTypes.string),
    text: PropTypes.string,
    habitat: PropTypes.string,
    growthRate: PropTypes.string,
    shape: PropTypes.string,
    color: PropTypes.string,
    evolution: PropTypes.arrayOf(PropTypes.object),
  }),
  loading: PropTypes.bool,
  ChangeMessage: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PokemonsDetails));
