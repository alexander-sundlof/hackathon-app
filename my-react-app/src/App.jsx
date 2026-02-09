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
  const [showReward, setShowReward] = useState(true)
  const [showRealReward, setShowRealReward] = useState(false)
  const [counter, setCounter] = useState(1)

  const loadNewData = async () => {
  try {
    // Step 1: fetch first page to get total count
    const firstResponse = await fetch(
      "https://api.fbi.gov/wanted/v1/list?page=1&pageSize=20"
    );
    const firstData = await firstResponse.json();
    const totalPages = Math.ceil(firstData.total / 20);

    let randomPerson = null;
    let attempts = 0;
    const maxAttempts = 20; // safety to prevent infinite loops

    // Step 2: loop until we find a person with reward_text
    while (!randomPerson && attempts < maxAttempts) {
      attempts++;

      // Pick a random page
      const randomPage = Math.floor(Math.random() * totalPages) + 1;

      // Fetch that page
      const randomResponse = await fetch(
        `https://api.fbi.gov/wanted/v1/list?page=${randomPage}&pageSize=20`
      );
      const randomData = await randomResponse.json();

      // Pick a random person from the page
      const randomIndex = Math.floor(Math.random() * randomData.items.length);
      const candidate = randomData.items[randomIndex];

      // Check if they have reward_text
      if (candidate.reward_text && candidate.reward_text.trim() !== "") {
        randomPerson = candidate;
      }
    }

    if (!randomPerson) {
      console.warn("No person with a reward_text found after multiple attempts.");
      return;
    }

    // Step 3: set state
    setPerson(randomPerson);

    // Step 4: new dog image
    setDogUrl(`https://place.dog/300/200?${Date.now()}`);

    // Step 5: reset game state
    setGuess("");
    setResult("");
  } catch (err) {
    console.error(err);
  }
  setCounter(1);

  setShowReward(true);
  setShowRealReward(false);
};



  // Load on first page load
  useEffect(() => {
    loadNewData()
  }, [])

  const checkGuess = () => {
  if (!person?.reward_text) {
    setResult("This person has no listed reward.");
    return;
  }

  const reward = extractRewardAmount(person.reward_text);

  if (Number(guess) < reward) setResult("Too low");
  else if (Number(guess) > reward) setResult("Too high");
  else setResult("Correct!");

  

  // increment counter
  const newCount = counter + 1;
  setCounter(newCount);

  if (newCount === 4) {
    setShowReward(false);
    setShowRealReward(true);
  }
};


  return (
    <>
      <h1>FBI MOST WANTED</h1>
      <h2>Guess the wanted sum</h2>

      <FbiPerson person={person} showReward={showReward} showRealReward={showRealReward} />
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

