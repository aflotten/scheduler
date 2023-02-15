import axios from "axios";
import { useState, useEffect } from "react";
import { getDay } from "helpers/selectors";

export default function useApplicationData() {

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
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
    

    return axios.put(`/api/appointments/${id}`, appointment)
         .then(() => {
          setState({...state, appointments, days})
        })
  }

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