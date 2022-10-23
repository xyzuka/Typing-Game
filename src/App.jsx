import React from 'react'
import './App.css'
import useWordGame from './hooks/useWordGame'

function App() {
  const {
    handleChange, 
    text, 
    isTimeRunning, 
    textboxRef, 
    time, 
    startGame, 
    finalWordCount
  } = useWordGame()

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