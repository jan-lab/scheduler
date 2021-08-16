//There is often a need to compute new data from existing state in an application. To do this we can use a selector, a function that accepts state as an argument and returns data that is derived from that state.

export function getAppointmentsForDay(state, givenDay) {

  const selectedDay = state.days.find(day => day.name === givenDay);
  
  // if days array has an invalid day, return an empty array
  if (state.days.length === 0 || !selectedDay) {
    return [];
  }
  
  // for each appointment id on the selectedDay, return the associated value in state.appointments
  const actualAppointments = selectedDay.appointments.map((id) => {
    return state.appointments[id];
  });

  //return the actualAppointments array
  return actualAppointments;
}

export function getInterviewersForDay(state, givenDay) {

  const selectedDay = state.days.find(day => day.name === givenDay);
  
  // if days array has an invalid day, return an empty array
  if (state.days.length === 0 || !selectedDay) {
    return [];
  }
  
  // for each interviewer id on the selectedDay, return the associated value in state.interviewers
  const actualInterviewers = selectedDay.interviewers.map((id) => {
    return state.interviewers[id];
  });

  // return the actualInterviewers array
  return actualInterviewers;
}


//This function will return an object that contains the interview data if it is passed an object that contains an interviewer.
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  //The function should return a new object containing the interview data when we pass it an object that contains the interviewer. Otherwise, the function should return null.
  const interviewerId = interview.interviewer;

  //transform an interview object with an id representing the interviewer to an object containing a nested object
  const interviewer = state.interviewers[interviewerId];

  return { student: interview.student, interviewer: interviewer};
}