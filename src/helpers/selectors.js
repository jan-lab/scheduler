
// export const getAppointmentsForDay = function(state) {
export const getAppointmentsForDay = function(state, day) {
  //... returns an array of appointments for that day
 
 const dayObj = state.days.find(d => d.name === day);
//  const dayObj = state.days.find(d => d.name === state.day);

 if (!dayObj) {
   return [];
 }
 //state.appointments[id] is an interview
 return dayObj.appointments.map(id => state.appointments[id]);
 
};

//interview is just a specific appointment for the day
export const getInterview = function(state, interview) {

  if (!state.interviewers) {
    return null;
  }
  // console.log(state.appointments.id);
  // return state.appointments.interview;

  // console.log(state.interviewers);
  // console.log(interview);

  return (
    //return two things: the whole interview and an object that contains the interview as well as the 
    //interviewer of the appointment
    interview && {...interview, interviewer: state.interviewers[interview.interviewer]}
  )

} ;

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