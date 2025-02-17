import { ChangeEvent, useEffect, useState } from "react"
import { PokemonCard } from "../models/PokemonCard";
import { levenshteinDistance } from "../utils/levenshtein";
import { filterCardName } from "../utils/filterCardName";


export default function TCGgame() {

    // IMPORTANTE ----> Esto tiene que estar en el .env /////////////////////////////////////////////////////////////////////////////////
   
    const [cardImage, setCardImage] = useState<string>('')
    const [cardName, setCardName] = useState<string>('UNKNOWN')
    const [introducedName, setIntroducedName] = useState('')
    const [score, setScore] = useState(0)
    const [imageBlur, setImageBlur] = useState('')
    const [bestScore, setBestScore] = useState(0)
    const [failMessage, setFailMessage] = useState('')
    
   
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
        setIntroducedName(e.target.value.toLowerCase());
      }

      const guess = async ()=>{

        if (levenshteinDistance(introducedName, cardName) <= 3) {
          setImageBlur('')
          setScore(score+1)
          if (score+1>bestScore) {setBestScore(score+1)}
          }else{
            setImageBlur('')
            setScore(0)
            setFailMessage('El Pokémon era ' + cardName.toUpperCase())
          } await setTimeout(() => changePokemon().then(()=>{
            setIntroducedName('')
            setFailMessage('')
          }))
          
      }

      function getRandomPokemonCardNumber(): string {
        const pokemonSets = [
          {prefix: 'swsh', maxPokemon: 159 },
          {prefix: 'sm', maxPokemon: 149 },
          {prefix: 'xy', maxPokemon: 114 },
          {prefix: 'bw', maxPokemon: 113 },
          {prefix: 'dp', maxPokemon: 106 },
          {prefix: 'hgss', maxPokemon: 123 },
          {prefix: 'pl', maxPokemon: 127 },
          {prefix: 'ex', maxPokemon: 100 },
          {prefix: 'col', maxPokemon: 95 },
          {prefix: 'hs', maxPokemon: 102 },
          {prefix: 'b2w2', maxPokemon: 135 },
          {prefix: 'bwp', maxPokemon: 101 },
          {prefix: 'dpp', maxPokemon: 146 },
          {prefix: 'ru', maxPokemon: 95 },
          {prefix: 'sv', maxPokemon: 165 },
        ];
      
        const randomSet = pokemonSets[Math.floor(Math.random() * pokemonSets.length)];
        const randomNumber = Math.floor(Math.random() * randomSet.maxPokemon) + 1;
        return `${randomSet.prefix}-${randomNumber}`;
      }
      const changePokemon = async ()=>{
        const cardData: PokemonCard|null = await fetchAPI(getRandomPokemonCardNumber())
        setCardImage(cardData?.images.small || '')
        const newName =cardData?.name.split('-')[0].trim().toLowerCase() || ''
        setCardName(filterCardName(newName))
        setImageBlur('blur-sm')
      }

    


  return (<>
  <div className="h-screen w-screen max-w-[600px] bg-gray-400 flex flex-col items-center justify-center">
  <h1 className="text-white font-bold text-3xl mb-20">Puntuación: {score}</h1>
        <img src={cardImage} className={` rounded-2xl scale-125 mb-4 mb-20 ${imageBlur}`} draggable='false' alt="   Cargando..."/>
        <div className="flex flex-row">
              <div className="p-0.5  rounded-2xl mb-3 hover:scale-110 transition-transform duration-250">
                <input value={introducedName} id='userGuess'  autoComplete="off" name="introducedName" onChange={handleChangeName} className={`text-black focus:outline-0  text-2xl p-3 rounded-2xl text-center bg-white`}></input>
              </div>
              <button id="guessButton" onClick={guess}  className=" transition-transform ml-3 duration-250 cursor-pointer bg-gradient-to-r hover:scale-110 from-blue-300 to-blue-400  px-6 rounded-2xl hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 font">
                <img src="/send.png" className="size-7"></img>  
              </button><br/><br/><br/>
        </div>
        <h1 className="text-red-500 font-bold text-2xl mt-10">{failMessage}</h1>


        <h1 className="text-white font-bold text-xl absolute bottom-5">Récord: {bestScore}</h1>
        
  </div>
  </>
  )
}
