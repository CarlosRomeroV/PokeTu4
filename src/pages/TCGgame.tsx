import { ChangeEvent, useEffect, useState } from "react"
import { PokemonCard } from "../models/PokemonCard";


export default function TCGgame() {

    // IMPORTANTE ----> Esto tiene que estar en el .env /////////////////////////////////////////////////////////////////////////////////
   
    const [cardImage, setCardImage] = useState<string>('')
    const [cardName, setCardName] = useState<string>('unknown')
    const [introducedName, setIntroducedName] = useState('')
    const [pokemonType, setPokemonType] = useState<string|undefined>(undefined)
    
   
    const TCGkey:string = "05ce244f-f181-4953-9c83-f89e6fe56845"
    async function fetchAPI(cardNumber: string): Promise<PokemonCard | null> {
        try {
          const response = await fetch(`https://api.pokemontcg.io/v2/cards?q=supertype:Pokémon number:${cardNumber.split('-')[1]}`, {
            headers: {'X-Api-Key': TCGkey}
          });
          const data = await response.json();
          return data.data[0] || null;
        } catch (error) {
          console.log('Error: ' + error);
          return null
        }
      }
    
      //.data[0]?.images?.small
      useEffect(() => {
        (async () => {
          changePokemon()
          
        })()
      }, [])

      const handleChangeName = (e:ChangeEvent<HTMLInputElement>)=>{
        setIntroducedName(e.target.value);
      }

      function getRandomPokemonCardNumber(): string {
        const pokemonSets = [
          { prefix: 'swsh', maxPokemon: 159 },
          { prefix: 'sm', maxPokemon: 149 },
          { prefix: 'xy', maxPokemon: 114 },
          { prefix: 'bw', maxPokemon: 113 },
          { prefix: 'dp', maxPokemon: 106 }
        ];
      
        const randomSet = pokemonSets[Math.floor(Math.random() * pokemonSets.length)];
        const randomNumber = Math.floor(Math.random() * randomSet.maxPokemon) + 1;
        return `${randomSet.prefix}-${randomNumber}`;
      }
      const changePokemon = async ()=>{
        const cardData: PokemonCard|null = await fetchAPI(getRandomPokemonCardNumber())
        setCardImage(cardData?.images.small || '')
        setCardName(cardData?.name.split('-')[0] || '')
        setPokemonType(cardData?.types[0])
      }

    


  return (<>
  <div className="h-screen w-screen max-w-[600px] bg-gray-400 flex flex-col items-center justify-center">
        <img src={cardImage} className="rounded-2xl scale-125 mb-4 blur-sm mb-20" draggable='false' alt="Cargando..."/>
        <div className="flex flex-row">
              <div className="p-0.5  rounded-2xl mb-3 hover:scale-110 transition-transform duration-250">
                <input value={introducedName} id='userGuess'  autoComplete="off" name="introducedName" onChange={handleChangeName} className="text-black focus:outline-0  bg-white text-2xl p-3 rounded-2xl text-center"></input>
              </div>
              <button id="guessButton"  className=" transition-transform ml-3 duration-250 cursor-pointer bg-gradient-to-r hover:scale-110 from-blue-300 to-blue-400  px-6 rounded-2xl hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 font">
                <img src="/send.png" className="size-7"></img>  
              </button><br/><br/><br/>
        </div>
        
  </div>
  </>
  )
}
