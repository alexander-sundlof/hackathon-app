import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DogImage from './DogImage'
import FbiPerson from "./FbiPerson"
import AmountInput from "./AmountInput";





function App() {
  const [count, setCount] = useState(0)

  
  return (
    <>
      
      
        
      

      
      <h1>FBI MOST WANTED </h1>
      <h1> Guess the wanted sum. </h1>
      <FbiPerson />
      <DogImage />
      <AmountInput />
      <div className="card">
        
        
      </div>
      
    </>
  )
}

export default App
