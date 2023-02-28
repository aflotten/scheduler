import { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  // transition and update history
  function transition(newMode, replace = false) {
    if (replace) {
      setHistory(prev => prev.slice(0, -1));
      setHistory(prev => [...prev, newMode]);
    } else {
      setHistory([...history, newMode]);
    }
  }

  // transition back and update history
  function back() {
    const newHistory = [...history];
    if (history.length < 2) {
      return;
    }
    setHistory(newHistory.slice(0, -1));
  }

  return { mode: history[history.length - 1], transition, back };
}