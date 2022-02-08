const numberOfPokemons = 30;
const pokeContainer = document.getElementsByClassName('poke-container')[0];

const getPokemonDataById = async function (id) {
   const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
   const response = await fetch(url);
   const data = await response.json();
   const pokeData = {
      id,
      name: data.name,
      img: `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${id}.svg`,
      type: data.types[0].type.name,
   };
   return pokeData;
};

const renderPokeCardsById = async function (i) {
   const pokemon = await getPokemonDataById(i);
   const name = pokemon.name.slice(0, 1).toUpperCase() + pokemon.name.slice(1);
   const id = String(pokemon.id);
   const type =
      pokemon.type.slice(0, 1).toUpperCase() + pokemon.type.slice(1) + ' type';
   const cardHtml = `
   <div class="flex flex-col p-5 w-fit rounded-md bg-green-200 drop-shadow-2xl gap-3">
            <div class="bg-gray-50 rounded-full drop-shadow-xl">
                <img class="img h-36 w-36" src="${pokemon.img}"
                    alt="Pokemon" height="100" width="100">
            </div>
            <div class="flex flex-col items-center">
                <div class="bg-gray-50 w-12 h-5 flex justify-center items-center p-0 m-0 rounded-full drop-shadow-md">
                    <span class="text-xs font-nunito font-bold">${
                       id.length === 1
                          ? `#00${id}`
                          : id.length === 2
                          ? `#0${id}`
                          : `#${id}`
                    }</span>
                </div>
                <p class="font-carveatBrush text-2xl ">${name}</p>
                <p class="text-xs font-nunito font-bold">${type}</p>
            </div>
        </div>
   `;
   pokeContainer.insertAdjacentHTML('beforeend', cardHtml);
};

const renderPokemons = async function (numberOfPokemons) {
   for (let i = 1; i <= numberOfPokemons; i++) {
      await renderPokeCardsById(Math.floor(Math.random() * 649) + 1);
   }
};

renderPokemons(numberOfPokemons);
