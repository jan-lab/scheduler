import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";


export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));

  useEffect(() => {

    const getDays =  'http://localhost:8001/api/days'
    const getAppointments = 'http://localhost:8001/api/appointments'
    const getInterviewers = 'http://localhost:8001/api/interviewers'

    Promise.all([
      axios.get(getDays),
      axios.get(getAppointments),
      axios.get(getInterviewers)
    ]).then((all) => {
      //Update the effect to set the days and appointments state at the same time.
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      
      // console.log(state.interviewers); //this did not work?
      //console.log(all)
    })
  }, [])

  // const appointmentList = getAppointmentsForDay(state).map((appointment) => {

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const appointmentList = dailyAppointments.map((appointment) => {
    return <Appointment key={appointment.id} {...appointment} />;
  });

  // Needs to remove comments later
  // const appointments = getAppointmentsForDay(state, state.day);
  // const schedule = appointments.map((appointment) => {
  //   const interview = getInterview(state, appointment.interview);
  //   return (
  //     <Appointment
  //       key={appointment.id}
  //       id={appointment.id}
  //       time={appointment.time}
  //       interview={interview}
  //     />
  //   );
  // });

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
              setDay={day => setDay(day)}
            />
          
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentList}
        {/* {schedule} */}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
