import React, { useEffect } from 'react'
import './App.css'

function App() {
  const STARTING_TIME = 5

  const [text, setText] = React.useState("")
  const [time, setTime] = React.useState(STARTING_TIME)
  const [isTimeRunning,setIsTimeRunning] = React.useState(false)
  const [finalWordCount, setFinalWordCount] = React.useState(0)
  const textboxRef = React.useRef(null)

  function handleChange(e) {
    const {value} = e.target;
    setText(value)
  }

  function wordCount(text) {
    // take the state and split it into an array of words
    const textArr = text.split(' ')
    // count the length of words in the array - excluding blank items
    return textArr.filter(word => word !== '').length
  }

  function startGame() {
    setIsTimeRunning(true)
    setTime(STARTING_TIME)
    setText("")
    textboxRef.current.disabled = false
    textboxRef.current.focus()
  }

  function endGame() {
    setIsTimeRunning(false)
    const numWords = wordCount(text)
    setFinalWordCount(numWords)
  }

  useEffect(() => {
    if (isTimeRunning && time > 0) {
      setTimeout(() => {
        setTime(prevTime => prevTime - 1)
      }, 1000)
    } else if (time === 0) {
      endGame()
    }
  }, [time, isTimeRunning])

  return (
    <div className="App">
      <h1>How fast can you type?</h1>
      <textarea 
        onChange={handleChange}
        value={text}
        disabled={!isTimeRunning}
        ref={textboxRef}
      />
      <h4>Time remaining: {time}</h4>
      <button 
        onClick={startGame}
        disabled={isTimeRunning}
      >{time === 0 ? "Restart" : "Start"}
      </button>
      <h1>Word Count: {finalWordCount}</h1>
    </div>
  )
}

export default App


/**
 * Challenge:
 * 
 * Make the input box focus (DOM elements have a method called .focus()) 
 * immediately when the game starts
 */
