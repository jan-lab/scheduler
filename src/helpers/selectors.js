//There is often a need to compute new data from existing state in an application. To do this we can use a selector, a function that accepts state as an argument and returns data that is derived from that state.

export function getAppointmentsForDay(state, givenDay) {
  //... returns an array of appointments for that day
  const selectedDay = state.days.find(day => day.name === givenDay );
  // check if days array has an invalid day
  if (state.days.length === 0 || !selectedDay) {
    return [];
  }
  // for every id in selectedDay.appointments, the id is transformed to be its associated value in state.appointments
  const actualAppointments = selectedDay.appointments.map((id) => {
    // console.log(state.appointments[id]);
    return state.appointments[id];
  });
  return actualAppointments;
}

export function getInterviewersForDay(state, givenDay) {
  //... returns an array of appointments for that day
  const selectedDay = state.days.find(day => day.name === givenDay );
  // check if days array has an invalid day
  if (state.days.length === 0 || !selectedDay) {
    return [];
  }
  // for every id in selectedDay.appointments, the id is transformed to be its associated value in state.appointments
  const actualInterviewers = selectedDay.interviewers.map((id) => {
    // console.log(state.interviewers[id])
    return state.interviewers[id];
  });
  // console.log(actualInterviewers)
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



// // export const getAppointmentsForDay = function(state) {
// export const getAppointmentsForDay = function(state, day) {
//   //... returns an array of appointments for that day
//  console.log(state);
//  const dayObj = state.days.find(d => d.name === day);
// //  const dayObj = state.days.find(d => d.name === state.day);

//  if (!dayObj) {
//    return [];
//  }
//  //state.appointments[id] is an interview
//  return dayObj.appointments.map(id => state.appointments[id]);
 
// };

// //interview is just a specific appointment for the day
// export const getInterview = function(state, interview) {

//   if (!state.interviewers) {
//     return null;
//   }
//   // console.log(state.appointments.id);
//   // return state.appointments.interview;

//   // console.log(state.interviewers);
//   // console.log(interview);

//   return (
//     //return two things: the whole interview and an object that contains the interview as well as the 
//     //interviewer of the appointment
//     interview && {...interview, interviewer: state.interviewers[interview.interviewer]}
//   )

// } ;

// {
//   "id":1,
//   "time":"12pm",
//   "interview": {
//     "student": "Lydia Miller-Jones",
//     "interviewer": {
//       "id": 1,
//       "name": "Sylvia Palmer",
//       "avatar": "https://i.imgur.com/LpaY82x.png"
//     }
//   }
// }

// {
//   "id":1,
//   "time":"12pm",
//   "interview": {
//     "student": "Lydia Miller-Jones",
//     "interviewer": 1
//   }
// }


// What to 
// {  
//   "student": "Lydia Miller-Jones",
//   "interviewer": {  
//     "id": 1,
//     "name": "Sylvia Palmer",
//     "avatar": "https://i.imgur.com/LpaY82x.png"
//   }
// }