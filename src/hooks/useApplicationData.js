import axios from "axios";
import { useState, useEffect } from "react";
import { getDay } from "helpers/selectors";

export default function useApplicationData() {

  // hook to get all data from API, spreading previous state and updating days, appointments and interviewers
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    })
  }, [])

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  // use id and interview from save function to update appointment data
  function bookInterview(id, interview) {
    const appointment = {
    ...state.appointments[id], 
    interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const correctDay = getDay(state.day)

    const day = {
      ...state.days[correctDay],
      spots: state.days[correctDay].spots - 1
    }

    const days = state.days.map((item, index) => {
      if (index === correctDay) {
        return day;
      } else {
        return item;
      }
    })
    
    // use axios to fulfill API update call and set new state
    return axios.put(`/api/appointments/${id}`, appointment)
         .then(() => {
          setState({...state, appointments, days})
        })
  }

  // similar functionality to bookInterview with axios delete action and state update
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id], 
      interview: null
      };
  
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };

      const correctDay = getDay(state.day)

      //update spots remaining
      const day = {
        ...state.days[correctDay],
        spots: state.days[correctDay].spots + 1
      }

      const days = state.days.map((item, index) => {
        if (index === correctDay) {
          return day;
        } else {
          return item;
        }
      })

      return axios.delete(`api/appointments/${id}`, appointment)
        .then(() => {
          setState({...state, appointments, days})
        })
  }


  return { state, setDay, bookInterview, cancelInterview };
}