//import the useState hook from react
import { useState } from 'react';

export default function useVisualMode(initial) {

  //set the history with the initial mode provided
  const [history, setHistory] = useState([initial]);

  //create a function that takes in a new mode and updates the mode state with a new value
  function transition(mode, replace) {
    setHistory( prev =>
      // if there is a new mode to replace the current mode, i.e. if replace is true
      replace
        // replace the last element of the array with the new mode
      ? [...prev.slice(0, prev.length - 1), mode]
        // otherwise, returns the current mode - stays the same
      : [...prev, mode]
    )
  }

  //create a function to go back to the prev mode
  function back() {
    //if there is no history to go back, end the function
    if (history.length < 2) {
      return;
    }
    // prev is the latest history
    setHistory(prev => [...prev.slice(0, prev.length - 1)])
  }

  //set mode to the last item of the history array
  const mode = history[history.length-1];

  return { mode, transition, back }
}