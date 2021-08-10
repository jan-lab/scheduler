
import { useState, useEffect } from "react";
import axios from 'axios';


export default function ApplicationData(props) {

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
  
  const updateSpots = function (dayName, days, appointments) {
    // get the day object
    const dayObj = days.find(day => day.name === dayName)

    let spots = 0;
    // for every appt id in the day object's appointments array
    for(const id of dayObj.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    }
    // ensure updating an appt does not increase the number of spots
    // update spots in that day --> new day object
    const newDay = {...dayObj, spots};

    // newDays.splice(index, 1, newDay);
    // newDays [index] = newDay;
    
    // put the day back in the array --> new days array
    const newDays = days.map(day => day.name === dayName ? newDay : day);
    return newDays;
  };

  //We first locally careate an appointment online 50.
  function bookInterview(id, interview) {
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
    return axios.put('http://localhost:8001/api/appointments/' + id, appointment)
      .then((res) => {
        console.log(res);
        const days = updateSpots(state.day, state.days, appointments);
        setState({...state, appointments, days});
      }) //shd not use catch here
    }
  

  //promise: we are using it for the api call
  //async await: using it to return the status of the promise
  //for api calls, we usually use both 

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id], //any current data that relates to the appointments[id], we made a copy with the ...operator because we are not using the entire state just modifying the appointments section of it
      // interview: { ...interview } //any current data that relates to the interview object
      interview: null  //we want to use the whole interview object. don't have to use the spread operator
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
  return axios.delete('http://localhost:8001/api/appointments/' + id)
      .then((res) => {
        console.log(res);
        const days = updateSpots(state.day, state.days, appointments);
        setState({...state, appointments, days});
      }) //should not use catch here

    }


    return {state, setDay, bookInterview, cancelInterview};
  }


