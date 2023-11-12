document.addEventListener("DOMContentLoaded", () => {
  //Barra de busqueda y elementos del HTML
  const searchButton = document.getElementById("search-button");
  const pokeNameInput = document.getElementById("poke-name");
  const pokemonInfo = document.getElementById("pokemon-info");
  const evolveButton = document.getElementById("evolve-button");
  const homeLink=document.getElementById('home-link');

  searchButton.addEventListener("click", async () => {
    //Nombre de pokemon ingresado
    const pokemonName = pokeNameInput.value.trim();

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      if (!response.ok) {
        throw new Error("No se encontro el pokemon,verifica el nombre e intentalo de nuevo");
      }
      const data = await response.json();
      const speciesData=await fetch(data.species.url);

      if(!speciesData.ok){
        throw new Error("Error al obtener la información del pokemon");
      }
    const speciesInfo=await speciesData.json();
    showPokemonInfo(data,speciesInfo);
    } catch (error) {
      console.error("Error al cargar los detalles del pokemon", error);
    }
  });

  // funcion para detalles pokemon
  function showPokemonInfo(data,speciesInfo) {
    const pokemonNameInfo = document.getElementById("pokemon-name-info");
    const pokemonImage = document.getElementById("pokemon-image");
    const descripcionPokemon = document.getElementById("descripcion-pokemon");
    const movimientosPokemon = document.getElementById("movimientos-pokemon");

    pokemonNameInfo.textContent = data.name;
    pokemonImage.src = data.sprites.front_default;
    const descripcion=getFlavorText(speciesInfo.flavor_text_entries);
    descripcionPokemon.textContent = `Descripción del pokemon: ${descripcion}`; //Pendiente por implementacion
    //logica movimientos  pokemon

    movimientosPokemon.innerHTML = "";
    data.moves.slice(0, 5).forEach((move) => {
      const li = document.createElement("li");
      li.textContent = move.move.name;
      movimientosPokemon.appendChild(li);
    });

    pokemonInfo.classList.remove("hidden");
    //mostrar el boton de evolucion, segun corresponda
    evolveButton.classList.remove("hidden"); //Pendiente por implementacion
  }

  function getFlavorText(flavorTextEntries) {
    const descripcion=flavorTextEntries.find(entry=>entry.language.name==='es').flavor_text;
    return descripcion;
    }

  function resetPage() {
    pokemonInfo.classList.add("hidden");
    evolveButton.classList.add("hidden");
    pokeNameInput.value = "";
    pokeNameInput.focus();
  }
  homeLink.addEventListener("click",resetPage);
});

