const PokemonArray = [];
const main$$ = document.querySelector("main")
const get = async () => {
  try {
    const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151"); 
    const res = await respuesta.json();
    console.log(res.results);
    for (const pokemon of res.results) {
      const pokemonRespuesta = await fetch(pokemon.url);
      const pokemonData = await pokemonRespuesta.json();
      console.log(pokemonData);
      const Pokemons = {
        name: pokemonData.name,
        image: pokemonData.sprites.front_default,
        types: pokemonData.types.map(type => type.type.name),
        id: pokemonData.id,
      };
      PokemonArray.push(Pokemons);
    }
    return PokemonArray;
  } catch (error) {
    console.log(error);
  }
}
const pintar = (Pokemons) => {
  main$$.innerHTML="";
  for (const Pokemon of Pokemons){
    const PokeDiv$$ = document.createElement("div")
    PokeDiv$$.innerHTML =`
    <div class="card">
    <div class="background ${Pokemon.types[0].toLowerCase()}" >
    <h2 class="Name">${Pokemon.id} ${Pokemon.name}</h2>
    <div class="backgroundart" >
    <img class="pokeimg" src="${Pokemon.image}" alt"${Pokemon.id}">
    </div class="type">
    <div class="type">
    <p>${Pokemon.types[0]}</p>
    ${Pokemon.types[1] ? `<p>${Pokemon.types[1]}</p>` : ''}
    </div>
    </div>
    </div>
    `
    main$$.appendChild(PokeDiv$$)
  }
}

const init = async () => {
  const Pokemons = await get()
  pintar(Pokemons)

}
init()
console.log(PokemonArray);
