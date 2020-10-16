import React, { Component, } from 'react';
import { connect } from 'react-redux';
import { ChangeDetail, ChangeLoading, CreatePokemon } from '../actions';
import { withRouter, Redirect } from 'react-router-dom';
import axios from 'axios';

const mapStateToProps = state => ({
  pokemons: state.pokemons,
  detail: state.detail,
});

const mapDispatchToProps = {
  ChangeDetail,
  ChangeLoading,
  CreatePokemon,
};

class PokemonsDetails extends Component {  
  constructor(props) {
    super(props);
    ChangeLoading(true);
  }

  componentDidMount() {
    const { number } = this.props.match.params;
    const { ChangeDetail, ChangeLoading, pokemons } = this.props;
    ChangeDetail({});
    if (pokemons.length === 0) {
      return
    }
    const url = 'https://pokeapi.co/api/v2/pokemon/';
    const url2 = 'https://pokeapi.co/api/v2/pokemon-species/';
    axios.get(url + number)
      .then(data => {
        axios.get(url2 + number)
          .then(data2 => {
            let chainUrl = 'unknown'
            if (data2.data.evolution_chain) {
              chainUrl = data2.data.evolution_chain.url
            }
            if (chainUrl !== 'unknown') {
              axios.get(chainUrl)
                .then(dataEvolution => {
                  let evChain = dataEvolution.data.chain;
                  const evolution = [];
                  while (evChain !== undefined) {
                    const evName = evChain.species.name;
                    let evNumbA = evChain.species.url.split('/');
                    const evNumb = evNumbA[evNumbA.length-2]
                    evolution.push({
                      name: evName,
                      evNumb: evNumb,
                      imageEv: pokemons[evNumb - 1].image
                    })
                    evChain = evChain.evolves_to[0];
                  }
                  const types = data.data.types.map(type => (type.type.name));
                  const texts = data2.data.flavor_text_entries.filter(item => (item.language.name === 'en'))
                    .map(text => (text.flavor_text));
                  const txtSize = texts.length;
                  const singleTxt = texts[Math.floor(Math.random() * txtSize)]
                  let habitatName = 'unknown';
                  if(data2.data.habitat) {
                    habitatName = data2.data.habitat.name;
                  }
                  let growth_rate = 'unknown';
                  if(data2.data.growth_rate){
                    growth_rate = data2.data.growth_rate.name
                  }
                  let shape = 'unknown';
                  if(data2.data.shape){
                    shape = data2.data.shape.name
                  }
                  ChangeDetail(
                    {
                      number: data.data.id,
                      namePkm: data.data.name,
                      base_experience: data.data.base_experience,
                      height: data.data.height,
                      weight: data.data.weight,
                      image: data.data.sprites.front_default,
                      capture_rate: data2.data.capture_rate,
                      types: types,
                      text: singleTxt, 
                      habitat: habitatName,
                      growth_rate: growth_rate,
                      shape: shape,
                      color: data2.data.color.name,
                      evolution: evolution,
                    },
                  );
                  ChangeLoading(false);
              }).catch(error => (console.log(error)));
            } else {
              const types = data.data.types.map(type => (type.type.name));
              const texts = data2.data.flavor_text_entries.filter(item => (item.language.name === 'en'))
                .map(text => (text.flavor_text));
              const txtSize = texts.length;
              const singleTxt = texts[Math.floor(Math.random() * txtSize)]
              let habitatName = 'unknown';
              if(data2.data.habitat) {
                habitatName = data2.data.habitat.name;
              }                  
              let growth_rate = 'unknown';
              if(data2.data.growth_rate){
                growth_rate = data2.data.growth_rate.name
              }
              let shape = 'unknown';
              if(data2.data.shape){
                shape = data2.data.shape.name
              }
              ChangeDetail(
                {
                  number: data.data.id,
                  namePkm: data.data.name,
                  base_experience: data.data.base_experience,
                  height: data.data.height,
                  weight: data.data.weight,
                  image: data.data.sprites.front_default,
                  capture_rate: data2.data.capture_rate,
                  types: types,
                  text: singleTxt, 
                  habitat: habitatName,
                  growth_rate: growth_rate,
                  shape: shape,
                  color: data2.data.color.name,
                  evolution: [{
                    name: data.data.name,
                    evNumb: data.data.id,
                    imageEv: data.data.sprites.front_default,
                  }],
                },
              );
            }
        }).catch(error => (console.log(error)));
      }).catch(error => (console.log(error)));
  }
  
  render() {
    const { pokemons, detail, loading } = this.props;
    if (pokemons.length === 0) {
      return <Redirect to="/" />
    }
    return (
      <>
        { loading && 
          <div> Loading Details...</div> 
        }
        { !loading &&
          <>
            <div className="pok-details" key={'#' + detail.number + ' ' + detail.namePkm}>
              <div>
                Name: {'#' + detail.number + ' ' + detail.namePkm}
                Base Exp: {detail.base_experience}
                height: {detail.height}
                weight: {detail.weight}
                <img src={detail.image} alt={detail.namePkm}/>
                capture_rate: {detail.capture_rate}
                text: {detail.text}
                <div>
                habitat: {detail.habitat}
                growth_rate: {detail.growth_rate}
                shape: {detail.shape}
                color: {detail.color}
                </div>
                <div>Types</div>
                <ul>
                  {
                    detail.types &&
                    detail.types.map(type => (<li key={type}>{type}</li>))
                  }
                </ul>
              </div>
            </div>
            <div className="evolution-path">
              Evolution chain:
              {
                 detail.evolution && detail.evolution.map(item => (
                 <div>  
                   <div key={item.evNumb}> 
                     {item.evNumb + ' '}                     
                     {item.name}
                   </div>
                   <div> 
                     <img src={item.imageEv} alt={item.name}/>
                   </div>
                 </div>)
               )
              }
            </div>
          </>
        }
      </>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PokemonsDetails));
