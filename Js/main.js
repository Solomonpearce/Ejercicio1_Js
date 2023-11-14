document.addEventListener("DOMContentLoaded", () => {
  //Barra de busqueda y elementos del HTML
  const searchButton = document.getElementById("search-button");
  const pokeNameInput = document.getElementById("poke-name");
  const pokemonInfo = document.getElementById("pokemon-info");
  const evolveButton = document.getElementById("evolve-button");
  const homeLink = document.getElementById("home-link");

  evolveButton.addEventListener("click", async () => {
    if(currentEvolutions.length > 0){
      const evolution = currentEvolutions.shift();
      const evolutionPokemon= await getPokemonDetails(evolution);
      const nextSpeciesInfo = await getPokemonSpeciesInfo(evolutionPokemon.species.url);
      const nextEvolutionChain = await getEvolutionChain(nextSpeciesInfo.evolution_chain.url);
      currentEvolutions = getEvolutions(nextEvolutionChain.chain,evolutionPokemon.name);
      displayPokemonDetails(evolutionPokemon, nextSpeciesInfo, nextEvolutionChain);
      if(currentEvolutions.length === 0){
        evolveButton.classList.add("hidden");
      }
    }else{
      console.warn("No hay mas evoluciones");
      evolveButton.classList.add("hidden");
    }
  });

  searchButton.addEventListener("click", async () => {
    const pokemonName = pokeNameInput.value.trim().toLowerCase();

    try {
      const data= await getPokemonDetails(pokemonName);
      const speciesInfo = await getPokemonSpeciesInfo(data.species.url);
      const evolutionChain = await getEvolutionChain(speciesInfo.evolution_chain.url);

      displayPokemonDetails(data, speciesInfo, evolutionChain);
    } catch (error) {
      console.error("Error al cargar los detalles del pokemon", error);
    }
  });

  function displayPokemonDetails(data,speciesInfo,evolutionChain){
    currentEvolutions = getEvolutions(evolutionChain.chain,data.name);
    const pokemonNameInfo = document.getElementById("pokemon-name-info");
    const pokemonImage = document.getElementById("pokemon-image");
    const descripcionPokemon = document.getElementById("descripcion-pokemon");
    const movimientosPokemon = document.getElementById("movimientos-pokemon");
    const habilidadesPokemon = document.getElementById("habilidades-pokemon");
    console.log("Habilidades:", data.abilities.map(a => a.ability.name));
    console.log("Movimientos:", data.moves.map(m => m.move.name));

    pokemonNameInfo.textContent = data.name;
    pokemonImage.src = data.sprites.front_default;
    const descripcion = getFlavorText(speciesInfo.flavor_text_entries);
    descripcionPokemon.textContent = `Descripción del pokemon: ${descripcion}`;

    habilidadesPokemon.innerHTML = "";
    data.abilities.slice(0, 5).forEach((ability) => {
      const li = document.createElement("li");
      li.textContent = ability.ability.name;
      habilidadesPokemon.appendChild(li);
    });



    movimientosPokemon.innerHTML = "";
    data.moves.slice(0, 5).forEach((move) => {
      const li = document.createElement("li");
      li.textContent = move.move.name;
      movimientosPokemon.appendChild(li);
    });
    pokemonInfo.classList.remove("hidden"); 

    if(evolutionChain && evolutionChain.chain && evolutionChain.chain.evolves_to.length > 0){
      evolveButton.classList.remove("hidden");
    }else{
      evolveButton.classList.add("hidden");
    }
  } 

  function getFlavorText(flavorTextEntries) {
    const descripcion = flavorTextEntries.find(
      (entry) => entry.language.name === "es"
    ).flavor_text;
    return descripcion;
  }
  function resetPage() {
    pokemonInfo.classList.add("hidden");
    evolveButton.classList.add("hidden");
    pokeNameInput.value = "";
    pokeNameInput.focus();
  }
  homeLink.addEventListener("click", resetPage);

  async function getPokemonDetails(pokemonName){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    if (!response.ok) {
      throw new Error("No se encontro el pokemon,verifica el nombre e intentalo de nuevo");
    }
    return response.json();
  }

  async function getPokemonSpeciesInfo(url){
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error al obtener la información del pokemon");
    }
    return response.json();
  }
  async function getEvolutionChain(url){
    const response = await fetch(url);
    if (!response.ok){
      throw new Error("Error al obtener la información de evolucion del pokemon");
    }
    return response.json();
  }

  //Manejo de evoluciones. --- Queda faltando manejo del arbol de evolucion de pokemones como eevee. 
  function getEvolutions(evoChain, pokemonName) {
    let evolutions = [];
    let foundPokemon = false;

    let queue = [evoChain];
    while (queue.length > 0) {
      let current = queue.shift();
      if (current.species.name === pokemonName) {
        foundPokemon = true;
      }
      if (foundPokemon) {
        for (let evo of current.evolves_to) {
          evolutions.push(evo.species.name);
          queue.push(...evo.evolves_to);
        }
      } else {
        queue.push(...current.evolves_to);
      }
    }

    return evolutions;
  }

  async function evolvePokemon() {
    if (currentEvolutions.length > 0) {
      let nextEvolution = currentEvolutions.shift();
      let pokemonData = await getPokemonDetails(nextEvolution);
      let speciesInfo = await getPokemonSpeciesInfo(pokemonData.species.url);
      let evolutionChain = await getEvolutionChain(speciesInfo.evolution_chain.url);
      displayPokemonDetails(pokemonData, speciesInfo, evolutionChain);
    }
  }
});
