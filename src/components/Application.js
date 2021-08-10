import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from 'components/Appointment';
import React from "react";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";
import useApplicationData from 'hooks/useApplicationData';

export default function Application() {
  const {
    state, setDay, bookInterview, cancelInterview} = useApplicationData();

  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  const appointmentList = appointments.map(
    appointment => {
      return (
        <Appointment
          key={appointment.id}
          {...appointment}
          interview={getInterview(state, appointment.interview)}
          interviewers={interviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
      );
    }
  );


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
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        <section className="schedule">
          {appointmentList}
          <Appointment key="last" time="5pm" />
        </section>
      </section>
    </main>
  );
}

// export default function Application(props) {

//   console.log('props passed to Application component:',props); // {}

//     const schedule = props.appointments.map((appointment) => {
//       const interview = getInterview(props.state, appointment.interview); 
//       console.log(appointment); //appointment.interview is null
//       return (
//       <Appointment
//         key={appointment.id}
//         {...appointment}
//         interview={interview}
//         interviewers={props.interviewers}
//         bookInterview={props.bookInterview}
//         cancelInterview={props.cancelInterview}
//       />
//       );
//     });

//     return (
//       <main className="layout">
//       <section className="sidebar">
//         <img
//           className="sidebar--centered"
//           src="images/logo.png"
//           alt="Interview Scheduler"
//         />
//         <hr className="sidebar__separator sidebar--centered" />
//         <nav className="sidebar__menu">
//           <DayList
//             days={props.state.days}
//             day={props.state.day}
//             setDay={props.setDay}
//           />
//         </nav>
//         <img
//           className="sidebar__lhl sidebar--centered"
//           src="images/lhl.png"
//           alt="Lighthouse Labs"
//         />
//       </section>
//       <section className="schedule">
//         {schedule}
     
//         <Appointment key="last" time="5pm" />
//       </section>
//     </main>
//   );
// };

// //spots remaining
// //when we go thru bookInterview we simply subtract 1 from the spots remaining
// //add 1 when we go to canclInterview