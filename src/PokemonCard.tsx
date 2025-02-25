import './index.css';

interface PokemonCardProps {
    pokemonName: string;
    pokemonImage: string;
    pokemonType: string;
}

function PokemonCard({ pokemonName, pokemonImage, pokemonType }: PokemonCardProps)  {
  return (
    <div className='hover:transform hover:scale-105 transition duration-300 ease-in-out'>
        <div className="bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-xl font-bold mb-2">{pokemonName}</h2>
            <img src={pokemonImage} alt={pokemonName} className="w-full h-32 object-cover mb-2" />
            <p className="text-gray-700">Type: {pokemonType}</p>
        </div>
    </div>
  )
}
export default PokemonCard