import React from 'react'

function useWordGame(STARTING_TIME = 10) {
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

    React.useEffect(() => {
        if (isTimeRunning && time > 0) {
        setTimeout(() => {
            setTime(prevTime => prevTime - 1)
        }, 1000)
        } else if (time === 0) {
        endGame()
        }
    }, [time, isTimeRunning])

    return {handleChange, text, isTimeRunning, textboxRef, time, startGame, finalWordCount}
}

export default useWordGame