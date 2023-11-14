# Documentación del Proyecto Pokémon

Este proyecto es una aplicación web que permite a los usuarios buscar información sobre Pokémon utilizando la API de Pokémon.

## Código Fuente

El código fuente de la aplicación se encuentra en los archivos `main.js`, `index.html` y `styles.css`.

## Funcionalidades

La aplicación permite a los usuarios:

* Buscar un Pokémon por su nombre.
* Ver detalles sobre el Pokémon, incluyendo su imagen, descripción, habilidades y movimientos.
* Ver la cadena de evolución del Pokémon y evolucionarlo a su siguiente forma.

## Uso de la API de Pokémon

La aplicación utiliza la API de Pokémon para obtener la información del Pokémon. Las siguientes funciones en `main.js` hacen solicitudes a la API:

* `getPokemonDetails(pokemonName)`: Obtiene los detalles de un Pokémon a partir de su nombre.
* `getPokemonSpeciesInfo(url)`: Obtiene la información de la especie de un Pokémon a partir de una URL.
* `getEvolutionChain(url)`: Obtiene la cadena de evolución de un Pokémon a partir de una URL.

## Uso de la Aplicación

Para usar la aplicación, los usuarios deben ingresar el nombre de un Pokémon en el campo de entrada y hacer clic en el botón de búsqueda. La información del Pokémon se mostrará en la página. Si el Pokémon tiene una evolución, los usuarios pueden hacer clic en el botón de evolución para evolucionar al Pokémon a su siguiente forma.

## Diseño de la Aplicación

El diseño de la aplicación se controla con el archivo `styles.css`. Este archivo contiene las reglas de estilo CSS que se aplican a los elementos HTML en `index.html`.

## Desarrollo Futuro

En el futuro, se podrían agregar más características a la aplicación, como la capacidad de buscar Pokémon por tipo o la capacidad de ver todas las evoluciones de un Pokémon en lugar de solo la siguiente.
