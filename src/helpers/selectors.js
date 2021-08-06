
// export const getAppointmentsForDay = function(state) {
export const getAppointmentsForDay = function(state, day) {
  //... returns an array of appointments for that day
 
 const dayObj = state.days.find(d => d.name === day);
//  const dayObj = state.days.find(d => d.name === state.day);

 if (!dayObj) {
   return [];
 }
 return dayObj.appointments.map(id => state.appointments[id]);
 
};

// export const getInterview = function(state, interview) {

//   // if (!state.appointments.interview.interviewer) {
//   //   return null;
//   // }
//   console.log(state.appointments.id);
//   return state.appointments.interview;

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