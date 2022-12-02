const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 151;
const limit = 10;
let offset = 0;

function loadPokemonItems(offset, limit) {

   pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
      const newHtml = pokemons.map((pokemon) => `
         <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name" onclick="pokemonDetail(${pokemon.number})">${pokemon.name}</span>
      
            <div class="detail">
               <ol class="types">
                  ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
               </ol>
               <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
            
         </li>
      `).join('');

      const newHTMLPokemonDetail = '';

      pokemonList.innerHTML += newHtml;
   })
}

loadPokemonItems(offset, limit);

loadMoreButton.addEventListener('click', () => {
   offset += limit;
   const qtdRecordsWidthNextPage = offset + limit;

   if (qtdRecordsWidthNextPage >= maxRecords) {
      const newLimit = maxRecords - offset;
      loadPokemonItems(offset, newLimit);

      loadMoreButton.parentElement.removeChild(loadMoreButton);
   } else {
      loadPokemonItems(offset, limit);
   }
})

function pokemonDetail(number){
   const pokedex = document.getElementById(`poke_${number}`)
   const closePokedex = document.getElementsByClassName(`close${number}`);
   closePokedex[0].addEventListener("click", () => {pokedex.hidden = true}, false);
   pokedex.hidden = false;
}



