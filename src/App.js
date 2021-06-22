import React, {useState, useEffect, useRef} from "react"
import './App.css';
/**
 * Challenge:
 * 
 * When the timer reaches 0, count the number of words the user typed in 
 * and display it in the "Word count" section
 * 
 * After the game ends, make it so the user can click the Start button again
 * to play a second time
 */

 function App() {
  const STARTING_TIME = 5
  
  const [text, setText] = useState("")
  const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME)
  const [isTimeRunning, setIsTimeRunning] = useState(false)
  const [wordCount, setWordCount] = useState(0)
  const textBoxRef = useRef(null)
  
  function handleChange(e) {
      const {value} = e.target
      setText(value)
  }
  
  function calculateWordCount(text) {
      const wordsArr = text.trim().split(" ")
      return wordsArr.filter(word => word !== "").length
  }
  
  function startGame() {
      setIsTimeRunning(true)
      setTimeRemaining(STARTING_TIME)
      setText("")
      textBoxRef.current.disabled = false
      textBoxRef.current.focus()
  }
  
  function endGame() {
      setIsTimeRunning(false)
      setWordCount(calculateWordCount(text))
  }
  
  useEffect(() => {
      if(isTimeRunning && timeRemaining > 0) {
          setTimeout(() => {
              setTimeRemaining(time => time - 1)
          }, 1000)
      } else if(timeRemaining === 0) {
          endGame()
      }
  }, [timeRemaining, isTimeRunning])
  
  return (
      <div>
          <h1>How fast do you type?</h1>
          <textarea
              ref={textBoxRef}
              onChange={handleChange}
              value={text}
              disabled={!isTimeRunning}
          />
          <h4>Time remaining: {timeRemaining}</h4>
          <button 
              onClick={startGame}
              disabled={isTimeRunning}
          >
              Start
          </button>
          <h1>Word count: {wordCount}</h1>
      </div>
  )
}

export default App


/**
 * Challenge:
 * 
 * 1. Create state to hold the current value of the countdown timer.
 *    Display this time in the "Time Remaining" header
 * 
 * 2. Set up an effect that runs every time the `timeRemaining` changes
 *    The effect should wait 1 second, then decrement the `timeRemaining` by 1
 * 
 *    Hint: use `setTimeout` instead of `setInterval`. This will help you avoid
 *    a lot of extra work.
 * 
 *    Warning: there will be a bug in this, but we'll tackle that next
 *  
 *  3. Make it so the effect won't run if the time is already at 0

 */