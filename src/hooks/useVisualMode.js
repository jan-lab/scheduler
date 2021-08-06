import React, { useState } from 'react';

export default function useVisualMode(initial) {
  // set the mode state with the initial mode provided
  // const [mode, setMode] = useState(initial);
  // set the mode to the second to last index of history
  const [history, setHistory] = useState([initial]);

  //Create a function that will take in a new mode and update the mode state with the new value.
  function transition(mode, replace) {
    // setMode(mode);
    setHistory( prev =>
      // if there is a new mode to replace the current mode
      replace
        // returns the last index of prev as our mode
        // adds a new mode to the end of the array
      ? [...prev.slice(0, prev.length - 1), mode]
        // returns the current mode, stays the same
      : [...prev, mode]
    )
  }

  function back() {
    if (history.length < 2) {
      return;
    }
    // prev is the latest history
    setHistory(prev => [...prev.slice(0, prev.length - 1)])
  }

  //sets mode to the last item of the history array
  const mode = history[history.length-1];
  // return an object with a mode property, and transition
  return { mode, transition, back }
}