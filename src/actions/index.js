const CREATE_POKE = 'CREATE_POKE';
const REMOVE_POKE = 'REMOVE_POKE';
const CHANGE_MESS = 'CHANGE_MESS';
const CHANGE_FILTER = 'CHANGE_FILTER';
const CHANGE_LOAD = 'CHANGE_LOAD';

const CreatePokemon = pokemon => (
  {
    type: CREATE_POKE,
    pokemon,
  }
);
  
const RemovePokemon = pokemon => (
  {
    type: REMOVE_POKE,
    pokemon,
  }
);
  
const ChangeMessage = message => (
  {
    type: CHANGE_MESS,
    message,
  }
);


const ChangeFilter = typePkm => (
  {
    type: CHANGE_FILTER,
    typePkm,
  }
);

const ChangeLoading = isLoading => (
  {
    type: CHANGE_LOAD,
    isLoading,
  }
);

export {
  RemovePokemon, CreatePokemon, ChangeMessage, ChangeFilter, ChangeLoading, REMOVE_POKE, CREATE_POKE, CHANGE_MESS, CHANGE_FILTER, CHANGE_LOAD
};
