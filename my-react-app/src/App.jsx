import { useState, useEffect } from 'react'
import './App.css'
import DogImage from './DogImage'
import FbiPerson from "./FbiPerson"
import GuessInput from "./GuessInput"
import { extractRewardAmount } from './extractReward'

function extractReward(text) {
  const match = text.match(/\$([\d,]+)/)
  if (!match) return 0
  return Number(match[1].replace(/,/g, ""))
}

function App() {
  const [person, setPerson] = useState(null)
  const [dogUrl, setDogUrl] = useState("")
  const [guess, setGuess] = useState("")
  const [result, setResult] = useState("")

  const loadNewData = async () => {
  // Step 1: fetch first page to get total count
  const firstResponse = await fetch("https://api.fbi.gov/wanted/v1/list?page=1&pageSize=20");
  const firstData = await firstResponse.json();

  const totalPages = Math.ceil(firstData.total / 20);

  // Step 2: pick a random page
  const randomPage = Math.floor(Math.random() * totalPages) + 1;

  // Step 3: fetch that random page
  const randomResponse = await fetch(
    `https://api.fbi.gov/wanted/v1/list?page=${randomPage}&pageSize=20`
  );
  const randomData = await randomResponse.json();

  // Pick a random person from that page
  const randomIndex = Math.floor(Math.random() * randomData.items.length);
  const randomPerson = randomData.items[randomIndex];

  setPerson(randomPerson);

  // New dog
  setDogUrl(`https://place.dog/300/200?${Date.now()}`);

  // Reset game state
  setGuess("");
  setResult("");
};


  // Load on first page load
  useEffect(() => {
    loadNewData()
  }, [])

  const checkGuess = () => {
    if (!person?.reward_text) {
      setResult("This person has no listed reward.")
      return
    }

    const reward = extractRewardAmount(person.reward_text)

    if (Number(guess) < reward) setResult("Too low")
    else if (Number(guess) > reward) setResult("Too high")
    else setResult("Correct!")
  }

  return (
    <>
      <h1>FBI MOST WANTED</h1>
      <h2>Guess the wanted sum</h2>

      <FbiPerson person={person} />
      <DogImage url={dogUrl} />

      <GuessInput
        guess={guess}
        setGuess={setGuess}
        onSubmit={checkGuess}
      />

      <p style={{ fontSize: "20px", fontWeight: "bold" }}>{result}</p>

      <button onClick={loadNewData} style={{ marginTop: "20px" }}>
        New person and dog
      </button>
    </>
  )
}

export default App

