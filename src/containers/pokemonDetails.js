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
    if (pokemons.length === 0) {
      return
    }
    const url = 'https://pokeapi.co/api/v2/pokemon/';
    const url2 = 'https://pokeapi.co/api/v2/pokemon-species/';
    axios.get(url + number)
      .then(data => {
        axios.get(url2 + number)
          .then(data2 => {
            const chainUrl = data2.data.evolution_chain.url
            axios.get(chainUrl)
              .then(dataEvolution => {
                let evChain = dataEvolution.data.chain;
                const evolution = [];
                while (evChain !== undefined) {
                  const evName = evChain.species.name;
                  let evNumbA = evChain.species.url.split('/');
                  const evNumb = evNumbA[evNumbA.length-2]
                  console.log(evNumb)
                  console.log(pokemons)
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
                ChangeDetail(
                  {
                    base_experience: data.data.base_experience,
                    height: data.data.height,
                    weight: data.data.weight,
                    image: data.data.sprites.front_default,
                    capture_rate: data2.data.capture_rate,
                    types: types,
                    text: singleTxt, 
                    habitat: data2.data.habitat.name,
                    growth_rate: data2.data.growth_rate.name,
                    shape: data2.data.shape.name,
                    evolution: evolution,
                  },
                );
                ChangeLoading(false);
                console.log(evolution)
            }).catch(error => (console.log(error)));
        }).catch(error => (console.log(error)));
      }).catch(error => (console.log(error)));
  }
  
  render() {
    const { pokemons, detail, loading } = this.props;
    console.log(detail.evolution);
    if (pokemons.length === 0) {
      return <Redirect to="/" />
    }
    if (detail.evolution) {
    console.log(detail.evolution[0].name);
    }
    return (
      <>
        { loading && 
          <div> Loading Details...</div> 
        }
        { !loading &&
          <>
            <div className="pok-details">
              <div>
                Base Exp: {detail.base_experience}
                height: {detail.height}
                weight: {detail.weight}
                image: {detail.image}
                capture_rate: {detail.capture_rate}
              </div>
            </div>
            <div className="evolution-path">
              Evolution chain:
              {
                 detail.evolution && detail.evolution.map(item => (
                 <div>  
                   <div> 
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

/*
<div className="evolution-path">
Evo obj:
{
 detail.evolution.map(item => (
   <div> 
     {item.name}
   </div>)
 )
}
</div>
*/
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PokemonsDetails));
