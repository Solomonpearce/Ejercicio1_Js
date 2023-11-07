//Barra de busqueda
const searchButton=document.getElementById('search-button');
const pokeNameInput= document.getElementById('poke-name');
const pokemonInfo=document.getElementById('pokemon-info');
const evolveButton=document.getElementById('evolve-button');
const homeLink=document.getElementById('home-link');

//funcion para detalles pokemon
function showPokemonInfo(data){
    const pokemonNameInfo=document.getElementById('pokemon-name-info');
    const pokemonImage=document.getElementById('pokemon-image');
    const descripcionPokemon=document.getElementById('descripcion-pokemon');
    const movimientosPokemon=document.getElementById('movimientos-pokemon');

    pokemonNameInfo.textContent=data.name;
    pokemonImage.src=data.sprites.front_default;
    descripcionPokemon.textContent='Descripción del pokemon: ' //Pendiente por implementacion
    //logica movimientos  pokemon
    movimientosPokemon.innerHTML='';
    data.moves.slice(0,5).forEach((move)=>{
        const li=document.createElement('li');
        li.textContent=move.move.name;
        movimientosPokemon.appendChild(li);
    });

    pokemonInfo.classList.remove('hidden');
    //mostrar el boton de evolucion, segun corresponda
    //evolveButton.classList.remove('hidden'); //Pendiente por implementacion


}
searchButton.addEventListener('click',async ()=>{
    //Nombre de pokemon ingresado
    const pokemonName=pokeNameInput.value.trim();

    // Solicitud a la API
    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok){
            throw new Error("No se encontro el pokemon,verifica el nombre");
        }


        const data=await response.json();
        showPokemonInfo(data);
    }catch (error){
        console.error("Error al cargar los detalles del pokemon",error);
    }
});
        
