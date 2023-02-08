import { useState } from "react";


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace) {
      const changeHistory = [...history];
      changeHistory[changeHistory.length - 1] = newMode;
      setHistory(changeHistory);
    } else {
      const newHistory = [...history, newMode];
      setHistory(newHistory)
    }
  }

  function back() {
    const newHistory = [...history];
    if(history.length < 2) {
      return;
    } 

    setHistory(newHistory);
    newHistory.pop(mode);
    
  }

  return { mode:history[history.length-1], transition, back };
}