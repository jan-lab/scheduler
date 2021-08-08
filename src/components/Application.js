import "components/Application.scss";
import DayList from "./DayList";
import Appointment from 'components/Appointment';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";

export default function Application(props) {
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);

  console.log('props passed to Application component:',props); // {}

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  // spread operator replaces the day part within state
  const setDay = function(day) {
    setState({...state, day})
  };
  // runs once when application loads, and never again
  useEffect(() => {
    
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      
      // const [days, apppointments, interviewers] = all;
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      setState(prev => ({...prev, days, appointments, interviewers }));
    });
    
    }, [])
    
    const appointments = getAppointmentsForDay(state, state.day);
    const interviewers = getInterviewersForDay(state, state.day);


    //We first locally careate an appointment online 50.
    async function bookInterview(id, interview) {
      // console.log(id, interview);

      const appointment = {
        ...state.appointments[id], //any current data that relates to the appointments[id], we made a copy with the ...operator because we are not using the entire state just modifying the appointments section of it
        // interview: { ...interview } //any current data that relates to the interview object
        interview  //we want to use the whole interview object. don't have to use the spread operator
      };
      //we store the appointments object
      const appointments = {
        ...state.appointments, //creating a copy of all appointments in the state
        [id]: appointment //we are adding a new appointment to the state appointments object
      };
     
      //We make an api call. first is the url and append the id to the URL then we give the appointment data
      //If we get an error we do the catch if we get a proper response we then set the local state online 70 then return true;
      //Once the api call is completed, we return true on line 72 and then store the response on line 68.
      let response = await axios.put('http://localhost:8001/api/appointments/' + id, appointment)
        .then((res) => {
          console.log(res);
          setState({...state, appointments});
          return true;
        }) //shd not use catch here
      if (response) {
        return true;
      }
    }

    //promise: we are using it for the api call
    //async await: using it to return the status of the promise
    //for api calls, we usually use both 

    async function cancelInterview(id) {
      const appointment = {
        ...state.appointments[id], //any current data that relates to the appointments[id], we made a copy with the ...operator because we are not using the entire state just modifying the appointments section of it
        // interview: { ...interview } //any current data that relates to the interview object
        interview: null  //we want to use the whole interview object. don't have to use the spread operator
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      
      let response = await axios.delete('http://localhost:8001/api/appointments/' + id)
        .then((res) => {
          console.log(res);
          setState({...state, appointments});
          return true;
        }) //should not use catch here
      if (response) {
        return true;
      }
    }

    const schedule = appointments.map((appointment) => {
      const interview = getInterview(state, appointment.interview); 
      console.log(appointment); //appointment.interview is null
      return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
      );
    });

    return (
      <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
     
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
};

//spots remaining
//when we go thru bookInterview we simply subtract 1 from the spots remaining
//add 1 when we go to canclInterview




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "components/Application.scss";
// import DayList from "components/DayList";
// import Appointment from "components/Appointment";
// import { getAppointmentsForDay, getInterview } from "helpers/selectors";


// export default function Application(props) {

//   const [state, setState] = useState({
//     day: "Monday",
//     days: [],
//     appointments: {},
//     interviewers: {}
//   });


//   const setDay = day => setState({ ...state, day });
//   // const setDays = days => setState(prev => ({ ...prev, days }));

//   useEffect(() => {

//     const getDays =  '/api/days'
//     const getAppointments = '/api/appointments'
//     const getInterviewers = '/api/interviewers'

//     Promise.all([
//       axios.get(getDays),
//       axios.get(getAppointments),
//       axios.get(getInterviewers)
//     ]).then((all) => {
//       //Update the effect to set the days and appointments state at the same time.
      
//       setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
//       // const days = all[0].data;
//       // const appointments = all[1].data;
//       // const interviewers = all[2].data;
//       // setState(prev => ({...prev, days, appointments, interviewers }));
 
      
//       // console.log(state.interviewers); //this did not work?
//       // console.log(all)
//     })
//   }, [])

//   // const appointmentList = getAppointmentsForDay(state).map((appointment) => {

//   // const dailyAppointments = getAppointmentsForDay(state, state.day);
//   // const appointmentList = dailyAppointments.map((appointment) => {
//   //   return <Appointment key={appointment.id} {...appointment} />;
//   // });

//   // Needs to remove comments later
//   const appointments = getAppointmentsForDay(state, state.day);

//   const schedule = appointments.map((appointment) => {
//     const interview = getInterview(state, appointment.interview);
//     return (
//       <Appointment
//         key={appointment.id}
//         id={appointment.id}
//         time={appointment.time}
//         interview={interview}  //interview is the whole appointment object as well as the specific interviewer object instead of having an id as an foreign key.
//       />
//     );
//   });

//   return (
//     <main className="layout">
//       <section className="sidebar">
//         <img
//           className="sidebar--centered"
//           src="images/logo.png"
//           alt="Interview Scheduler"
//         />
//         <hr className="sidebar__separator sidebar--centered" />
//         <nav className="sidebar__menu">
          
//             <DayList
//               days={state.days}
//               day={state.day}
//               setDay={day => setDay(day)}
//             />
          
//         </nav>
//         <img
//           className="sidebar__lhl sidebar--centered"
//           src="images/lhl.png"
//           alt="Lighthouse Labs"
//         />
//       </section>
//       <section className="schedule">
//         {/* {appointmentList} */}
//         {schedule}
//         <Appointment key="last" time="5pm" />
//       </section>
//     </main>
//   );
// }
