
import { ChangeEvent, useEffect, useState } from "react"
import { levenshteinDistance } from "../utils/levenshtein"


export default function GuessGame() {

    const BASE_POKEAPI = 'https://pokeapi.co/api/v2/pokemon/';

    const [pokeIndex, setPokeIndex]= useState<number>()
    const [imgUrl, setImgUrl] = useState(`${BASE_POKEAPI}${pokeIndex}/sprites/front_default`);
    const [correctName, setCorrectName] = useState<string|null>(null)
    const [introducedName, setIntroducedName] = useState<string>('')
    const [score, setScore] = useState(0)
    const [bestScore, setBestScore] = useState(0)
    const [round, setRound] = useState(1)
    const [randomSpecial, setRandomSpecial] = useState<string|null>(null)
    const [brightness, setBrightness] = useState('')
    const [failMessage, setFailMessage] = useState('')
    const [pokemonType, setPokemonType] = useState<string>('NORMAL')
    const [hintMessage, setHintMessage] = useState('')

    const rotation = ['', 'rotate-10', 'rotate-20', 'rotate-30', 'rotate-40', 'rotate-50', 'rotate-60', 'rotate-70', 'rotate-80', 'rotate-90', 'rotate-100', 'rotate-110', 'rotate-120', 'rotate-130', 'rotate-140', 'rotate-150', 'rotate-160', 'rotate-170', 'rotate-180', 'rotate-190', 'rotate-200', 'rotate-210', 'rotate-220', 'rotate-230', 'rotate-240', 'rotate-250', 'rotate-260', 'rotate-270', 'rotate-280', 'rotate-290', 'rotate-300', 'rotate-310', 'rotate-320', 'rotate-330', 'rotate-340', 'rotate-350', 'rotate-360'];

    const handleKeyDown = (event:KeyboardEvent) => {
      if (event.key === 'Enter') {
        guess()
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    useEffect(()=>{
        
        changePokemon()
       
    },[])

    const hint = async (hintIndex: number) =>{
      if (hintIndex==1) setHintMessage('Tipo: '+ pokemonType)

    }

    const guess = async ()=>{
      setBrightness('brightness-100')

      if (levenshteinDistance(introducedName, correctName) <= 3) {
        
        setScore(score+1)
        setRound(round+1)
        if (score+1>bestScore) {setBestScore(score+1)}
        
        }else{
          setScore(0)
          setRound(0)
          setFailMessage('El Pokémon era ' + correctName?.toUpperCase())
        } await setTimeout(() => changePokemon().then(()=>{
            setIntroducedName('')
            setBrightness('brightness-0') 
            setFailMessage('')
            setRandomSpecial(rotation[Math.floor(Math.random() * rotation.length)+1])}), 1000)
            
        
    }

    const handleChangeName = (e:ChangeEvent<HTMLInputElement>)=>{
      setIntroducedName(e.target.value);
    }

    //cambia la imagen, el index, y el nombre del Pokemon
    const changePokemon = async () => {
      const random = Math.floor(Math.random() * 1025) + 1;
  
      try {
          const response = await fetch(`${BASE_POKEAPI}${random}`);
          const data = await response.json();
          const sprite = data.sprites.front_default;
          setBrightness('brightness-0')
  
          if (sprite) { 
              setPokeIndex(random)
              setImgUrl(sprite)
              setCorrectName(data.name.split('-')[0])
              setPokemonType(data.types[0].type.name.toUpperCase())
              
              setHintMessage('')
          }
      } catch (error) {
          console.error(error);
      }
    };

  return (
    <>
        <div className="h-screen w-screen max-w-[600px] bg-gray-400 flex flex-col items-center justify-center">
        <h1 className="text-white font-bold text-3xl">Puntuación: {score}</h1>
            <img src={imgUrl} alt="Pokémon" className={`  mb-4 brightness-0  size-80  ${randomSpecial} ${brightness}`} draggable='false'></img>
            <div className="flex flex-row">
              <div className="p-0.5 rounded-2xl mb-3 hover:scale-110 transition-transform duration-250">
                <input value={introducedName} id='userGuess'  autoComplete="off" name="introducedName" onChange={handleChangeName} className="text-black focus:outline-0 mt-2 bg-white text-2xl p-3 rounded-2xl text-center"></input>
              </div>
              <button id="guessButton" onClick={guess} className=" transition-transform ml-3 duration-250 cursor-pointer bg-gradient-to-r hover:scale-110 from-blue-300 to-blue-400  px-6 rounded-2xl hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 font">
                <img src="/send.png" className="size-7"></img>  
              </button><br/><br/><br/>
            </div>
            <div className="flex flex-row mt-5"> 
              <button onClick={()=>hint(1)} className=" transition-transform ml-3 duration-250 cursor-pointer bg-gradient-to-r hover:scale-110 from-blue-300 to-blue-400  px-6 rounded-2xl hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 font">TIPO</button>
              <button onClick={()=>hint(1)} className=" transition-transform ml-3 duration-250 cursor-pointer bg-gradient-to-r hover:scale-110 from-blue-300 to-blue-400  px-6 rounded-2xl hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 font">TIPO</button>
              <button onClick={()=>hint(1)} className=" transition-transform ml-3 duration-250 cursor-pointer bg-gradient-to-r hover:scale-110 from-blue-300 to-blue-400  px-6 rounded-2xl hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 font">TIPO</button>
              <button onClick={()=>hint(1)} className=" transition-transform ml-3 duration-250 cursor-pointer bg-gradient-to-r hover:scale-110 from-blue-300 to-blue-400  px-6 rounded-2xl hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 font">TIPO</button>
            </div>
            <h1 className="text-red-500 font-bold text-2xl mt-7">{failMessage}</h1>
            <h1 className="text-green-400 font-bold text-2xl mt-10">{hintMessage}</h1>
            
            

            <h1 className="text-white font-bold text-xl absolute bottom-5">Récord: {bestScore}</h1>

            
        </div>
    </>
  )
}
//ignorar esta linea