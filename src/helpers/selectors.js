export function getAppointmentsForDay(state, day) {
  let results = [];
  if(!state.days) {
    return[];
  }
  let selectedDay = state.days.filter(thisDay => thisDay.name === day)[0];

  if(!selectedDay) {
    return [];
  }

  for (const id of selectedDay.appointments) {
    const appoint = state.appointments[id];
    results.push(appoint);
  }
  return results;
};


export function getInterview(state, interview) {
  if(!interview) {
    return null;
  }
  
  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  }
}
