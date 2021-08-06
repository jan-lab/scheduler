import React from "react";
import "./styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";

export default function Appointment(props) {

//console.log(props);
return (
<article className="appointment">
  
  <Header time={props.time}/>

  {props.interview ? 
  <Show student={props.interview.student} interviewer={props.interview.interviewer.name}/> : <Empty />}

</article>)
}

//outer brace is anonymous component

//when a component first loads, it has to mount. Once mounted, it can do anything. One of the things could be making a network request for instance. The way to do so is using a useEffect.
//The way it works is that it runs every time a component //takes a function // array of dependcies -> it it's empty, it will run only once - only on mount. Runs whenever a component updates. there can be multiple in the dependency array.