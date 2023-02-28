
// helper function to get array of appointments
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

// helper function to retrieve interview data
export function getInterview(state, interview) {
  if(!interview) {
    return null;
  }
  
  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  }
}

// helper function to get array of Interviewers for selected day
export function getInterviewersForDay(state, day) {
  let results = [];
  if(!state.days) {
    return[];
  }
  let selectedInterviewer = state.days.filter(thisDay => thisDay.name === day)[0];

  if(!selectedInterviewer) {
    return [];
  }

  const filtered = selectedInterviewer.interviewers;

  for (const id of filtered) {
    results.push(state.interviewers[id]);
  }
  return results;
};

//used for updating spots remaining
export function getDay(day) {
  const allDays = {
    Monday: 0,
    Tuesday: 1,
    Wednesday: 2,
    Thursday: 3,
    Friday: 4
  }
  return allDays[day]
}