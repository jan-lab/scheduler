//import necessary libraries, components, scss, helper functions, and hooks
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from 'components/Appointment';
import React from "react";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";
import useApplicationData from 'hooks/useApplicationData';

//create an Application component
export default function Application() {

  //extract the needed props from the useApplicationData module
  const {state, setDay, bookInterview, cancelInterview} = useApplicationData();
  
  //store appointments for the day into a variable
  const appointments = getAppointmentsForDay(state, state.day);
  
  //store interviewers for the day into a variable
  const interviewers = getInterviewersForDay(state, state.day);
  
  //for each of the appointment, return the appointment component with necessary props
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
};