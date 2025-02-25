import './index.css'
import { useState } from 'react'
import axios from 'axios'
import PokemonCard from './PokemonCard'
import Loader from './Loader'

function App() {

  interface Pokemon {
    name: string;
    image: string;
    type: string;
  }

  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]); // Stato per salvare i Pokémon
  const [loading, setLoading] = useState(false); // Stato per mostrare il caricamento
  const [error, setError] = useState<string | null>(null); // Stato per gestire errori

  const fetchPokemon = async () => {
    setLoading(true); // Imposta lo stato di caricamento a true
    setError(null); // Resetta eventuali errori precedenti

    try {
      const requests = [];
      // Con il ciclo for vengono fatte 5 richieste alla API per ottenere 5 Pokémon casuali. Le 5 richieste sono contenute nell'array requests.
      for (let i = 0; i < 5; i++) {
        const randomId = Math.floor(Math.random() * 898) + 1; // Pokémon da 1 a 898
        requests.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`));
      }

      // Dentro a respones ci saranno i dati dei 5 pokemon (che sono stati presi grazie a Promise.all che ha eseguito tutte le richieste in parallelo)
      const responses = await Promise.all(requests); // Esegue tutte le richieste in parallelo

      // Con map vengono estratti i dati di ogni Pokémon e salvati in pokemonData che è un array di oggetti
      const pokemonData = responses.map((res) => ({
        name: res.data.name,
        image: res.data.sprites.front_default,
        type: res.data.types.map((t: { type: { name: any; }; }) => t.type.name).join(", "),
      }));

      setPokemonList(pokemonData); // Salva i dati nel state (per poter aggiornare la UI)
    } catch (err) {
      setError("Errore nel caricamento dei Pokémon");
      console.log(error);
    } finally {
      await new Promise(resolve => setTimeout(resolve, 1000)); // attendi 1 secondo in più oltre al caricamento effettivo
      setLoading(false); // Disattiva il caricamento
    }
  };


  return (
    <>
      <div className=" p-20 flex flex-col items-center">
        <h1 className='text-3xl font-bold'>Pokemon API</h1>
        <p className='text-center text-sm'>Press on the button and generate 5 random pokemons!</p>
        <button className='bg-blue-400 px-5 py-2 mt-4 rounded-lg font-extrabold cursor-pointer hover:opacity-70' onClick={fetchPokemon}>Generate</button>

        {loading ? (<Loader />) :
          pokemonList.length === 0 ? (<p className='text-center mt-5'>The API has not been called yet</p>) :
          (
            <div className='m-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center justify-center align-middle'>
              {pokemonList.map((pokemon, index) => (
              <PokemonCard key={index} pokemonName={pokemon.name} pokemonImage={pokemon.image} pokemonType={pokemon.type} />
              ))}
            </div>
          )
        }
      </div>
    </>
  )
}

export default App
