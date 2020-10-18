import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { ChangeDetail, ChangeLoading, ChangeMessage } from '../actions';
import loadImg from '../assets/loadImg.gif';
import arrow from '../assets/arrowR.png';

const mapStateToProps = state => ({
  pokemons: state.pokemons,
  detail: state.detail,
  loading: state.loading,
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
    this.fetchData = this.fetchData.bind(this);
    this.createEvoChart = this.createEvoChart.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    const {
      match: {
        params: { number },
      },
    } = this.props;
    if (prevProps.match.params.number === number) {
      return;
    }
    this.fetchData();
  }

  fetchData() {
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
                  const evChain = dataEvolution.data.chain;
                  const evolution = [];
                  let evolveFrom = 0;
                  const evName = evChain.species.name;
                  const evNumbA = evChain.species.url.split('/');
                  const evNumb = evNumbA[evNumbA.length - 2];
                  evolution.push({
                    name: evName,
                    evNumb,
                    imageEv: pokemons[evNumb - 1].image,
                    evolveFrom,
                  });
                  evolveFrom = evNumb;
                  evChain.evolves_to.forEach(element => {
                    const evName2 = element.species.name;
                    const evNumbA2 = element.species.url.split('/');
                    const evNumb2 = evNumbA2[evNumbA2.length - 2];
                    evolution.push({
                      name: evName2,
                      evNumb: evNumb2,
                      imageEv: pokemons[evNumb2 - 1].image,
                      evolveFrom,
                    });
                    element.evolves_to.forEach(element2 => {
                      const evolveFrom2 = evNumb2;
                      const evName3 = element2.species.name;
                      const evNumbA3 = element2.species.url.split('/');
                      const evNumb3 = evNumbA3[evNumbA3.length - 2];
                      evolution.push({
                        name: evName3,
                        evNumb: evNumb3,
                        imageEv: pokemons[evNumb3 - 1].image,
                        evolveFrom: evolveFrom2,
                      });
                      element2.evolves_to.forEach(element3 => {
                        const evolveFrom3 = evNumb3;
                        const evName4 = element3.species.name;
                        const evNumbA4 = element3.species.url.split('/');
                        const evNumb4 = evNumbA4[evNumbA4.length - 2];
                        evolution.push({
                          name: evName4,
                          evNumb: evNumb4,
                          imageEv: pokemons[evNumb4 - 1].image,
                          evolveFrom: evolveFrom3,
                        });
                      });
                    });
                  });
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
                  let color = 'unknown';
                  if (data2.data.color) {
                    color = data2.data.color.name;
                  }
                  let captureRate = 'unknown';
                  if (data2.data.capture_rate) {
                    captureRate = data2.data.capture_rate;
                  }
                  ChangeDetail(
                    {
                      number: data.data.id,
                      namePkm: data.data.name,
                      baseExperience: data.data.base_experience,
                      height: data.data.height,
                      weight: data.data.weight,
                      image: data.data.sprites.front_default,
                      captureRate,
                      types,
                      text: singleTxt,
                      habitat: habitatName,
                      growthRate,
                      shape,
                      color,
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
              let color = 'unknown';
              if (data2.data.color) {
                color = data2.data.color.name;
              }
              let captureRate = 'unknown';
              if (data2.data.capture_rate) {
                captureRate = data2.data.capture_rate;
              }
              ChangeDetail(
                {
                  number: data.data.id,
                  namePkm: data.data.name,
                  baseExperience: data.data.base_experience,
                  height: data.data.height,
                  weight: data.data.weight,
                  image: data.data.sprites.front_default,
                  captureRate,
                  types,
                  text: singleTxt,
                  habitat: habitatName,
                  growthRate,
                  shape,
                  color,
                  evolution: [{
                    name: data.data.name,
                    evNumb: data.data.id,
                    imageEv: data.data.sprites.front_default,
                  }],
                },
              );
              ChangeLoading(false);
            }
          }).catch(error => (ChangeMessage(`API error ${error}`)));
      }).catch(error => (ChangeMessage(`API error ${error}`)));
  }

  createEvoChart() {
    const { detail } = this.props;
    const { evolution } = detail;
    if (!evolution) {
      return;
    }
    const arrOrder = [];
    const arrEvolver = [];
    evolution.forEach(item => {
      let indexActual = 0;
      if (!arrEvolver.includes(item.evolveFrom)) {
        // eslint-disable-next-line no-restricted-syntax
        for (const [key, value] of Object.entries(arrOrder)) {
          if (value.actual.includes(item.evolveFrom)) {
            indexActual = parseInt(key, 10) + 1;
          }
        }
        if (indexActual === 0) {
          arrEvolver.push(item.evolveFrom);
          indexActual = arrEvolver.indexOf(item.evolveFrom);
        }
      }
      if (arrOrder[indexActual]) {
        const tot = arrOrder[indexActual].total + 1;
        const arrImg = arrOrder[indexActual].images;
        const arrAtu = arrOrder[indexActual].actual;
        arrImg.push(item.imageEv);
        arrAtu.push(item.evNumb);
        arrOrder[indexActual] = {
          total: tot, images: arrImg, actual: arrAtu,
        };
      } else {
        arrOrder[indexActual] = {
          total: 1, images: [item.imageEv], actual: [item.evNumb],
        };
      }
    });
    // eslint-disable-next-line consistent-return
    return arrOrder;
  }

  render() {
    const { pokemons, detail, loading } = this.props;
    const evoChart = this.createEvoChart();
    let firstChain = true;
    if (pokemons.length === 0) {
      return <Redirect to="/" />;
    }
    return (
      <>
        { loading
          && (
          <div className="bg-load">
            <img className="margin-top-30 image-load" src={loadImg} alt="loadingImage" />
          </div>
          )}
        { !loading
          && (
          <div>
            <div className="pok-details" key={`#${detail.number} ${detail.namePkm}`}>
              <div className="main-info-container">
                <span className="detail-name">
                  {`#${detail.number} ${detail.namePkm}`.toUpperCase()}
                </span>
                <div className="flex-details card-detail-container">
                  <div className="detail-col-1">
                    <img className="detail-img" src={detail.image} alt={detail.namePkm} />
                    <div className="detail-text">
                      {detail.text}
                    </div>
                  </div>
                  <div className="flex-details-2">
                    <div className="margin-right">
                      <h2>Details Pokemon</h2>
                      <div className="margin-y">
                        <span className="bold-label">Height: </span>
                        {detail.height}
                      </div>
                      <div className="margin-y">
                        <span className="bold-label">Weight: </span>
                        {detail.weight}
                      </div>
                      <div className="margin-y">
                        <span className="bold-label">Capture Rate: </span>
                        {detail.captureRate}
                      </div>
                      <div className="margin-y">
                        <span className="bold-label">Growth Rate: </span>
                        {detail.growthRate}
                      </div>
                      <div className="margin-y">
                        <span className="bold-label">Base Exp: </span>
                        {detail.baseExperience}
                      </div>
                      <div className="type-container">
                        { detail.types && detail.types.length === 1
                        && (
                          <span className="type-title">Type</span>
                        )}
                        { detail.types && detail.types.length > 1
                          && (
                            <span className="type-title">Types</span>
                          )}
                        <ul className="type-list-det">
                          {
                            detail.types
                            && detail.types.map(type => (<li key={type}>{type}</li>))
                          }
                        </ul>
                      </div>
                    </div>
                    <div>
                      <h2>Details Species</h2>
                      <div className="margin-y">
                        <span className="bold-label">Habitat: </span>
                        {detail.habitat
                          && detail.habitat.charAt(0).toUpperCase() + detail.habitat.slice(1)}
                      </div>
                      <div className="margin-y">
                        <span className="bold-label">Shape: </span>
                        {detail.shape
                         && detail.shape.charAt(0).toUpperCase() + detail.shape.slice(1)}
                      </div>
                      <div className="margin-y">
                        <span className="bold-label">color: </span>
                        {detail.color
                         && detail.color.charAt(0).toUpperCase() + detail.color.slice(1)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="evolution-path">
              <span className="evolution-label">
                EVOLUTION CHAIN
              </span>
              <div className="card-detail-container d-flex evolution-images">
                { evoChart && evoChart.map(item => {
                  if (firstChain) {
                    firstChain = false;
                    return (
                      <Link key={item.actual[0]} to={`/pokemon/${item.actual[0]}`}>
                        <div>
                          <div>
                            <img src={item.images[0]} alt={item.actual[0]} />
                          </div>
                        </div>
                      </Link>
                    );
                  }
                  return (
                    [
                      <div key={`arrow${item.actual[0]}`} className="d-flex evolution-images">
                        <div className="self-center">
                          <img className="arrow-image" src={arrow} alt="arrowEvolve" />
                        </div>
                      </div>,
                      <div key={`evol${item.actual[0]}`} className="d-flex evolution-img-cont">
                        {
                          item.images.map((images, ind) => (
                            <Link key={item.actual[ind]} to={`/pokemon/${item.actual[ind]}`}>
                              <div>
                                <div>
                                  <img src={images} alt={item.actual[ind]} />
                                </div>
                              </div>
                            </Link>
                          ))
                        }
                      </div>,
                    ]
                  );
                })}
              </div>
            </div>
          </div>
          )}
      </>
    );
  }
}

PokemonsDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      number: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  ChangeLoading: PropTypes.func.isRequired,
  ChangeDetail: PropTypes.func.isRequired,
  pokemons: PropTypes.arrayOf(PropTypes.object).isRequired,
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
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  ChangeMessage: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PokemonsDetails));
