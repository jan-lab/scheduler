import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Error from "components/Appointment/Error";
import Form from "components/Appointment/Form";
import Confirm from "components/Appointment/Confirm";
import useVisualMode from "../../hooks/useVisualMode";
import Status from "components/Appointment/Status";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {

  //console.log('props passed to Appointment component:', props);
  /*
  {id: 3, time: "2pm", interview: null, interviewers: Array(5), bookInterview: ƒ, …}
    bookInterview: ƒ bookInterview(id, interview)
    id: 3
    interview: null
    interviewers: (5) [{…}, {…}, {…}, {…}, {…}]
    time: "2pm"
    key: undefined
  */


  const { mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // whenever we save the booking you first go to the save function online38 
  // In the save fxn we create an interview obj on line 40 and then transition to SAVING on line44
  // on line45 we call the interview function from the parent which is application.js
  // application.js bookInterview is an API call and we need to wait for the api call to complete
  // when we write await, we want React to wait for a response from the bookInterview fxn.
  // async function save(name, interviewer) {
  //   const interview = {
  //     student: name,
  //     interviewer
  //   };
  //   transition(SAVING);
  //   // //bookinterview will return true once the api call is succesfully executed and we save the response as true on line 49.
  //   // let response = await props.bookInterview(props.id, interview);
  //   // //if res is true we transition to SHOW. This is the async fxn execution.
  //   // if (response) {
  //   //   transition(SHOW);
  //   // }
    
  //   props
  //   .bookInterview(props.id, interview)
  //   .then(() => transition(SHOW))
  //   .catch(error => transition(ERROR_SAVE, true));


    function save(name, interviewer) {
      const interview = {
        student: name,
        interviewer
      };
    
      transition(SAVING);
    
      props
        .bookInterview(props.id, interview)
        .then(() => transition(SHOW))
        .catch(error => transition(ERROR_SAVE, true));
    }

    // let response = await props.bookInterview(props.id, interview)
    // .then((res) => {
    //   transition(SHOW);
    //   // return true;
    // }).catch((err) => {
    //   transition(ERROR_SAVE);
    // });



  // async function remove(name, interviewer){
  //   const interview = {
  //     student: name,
  //     interviewer
  //   };
  //   transition(CONFIRM)
    // transition(DELETING);

    //bookinterview will return true once the api call is succesfully executed and we save the response as true on line 49.
    // let response = await props.cancelInterview(props.id, interview);
    // //if res is true we transition to SHOW. This is the async fxn execution.
    // if (response) {
    //   transition(EMPTY);
    // }

    function remove(event) {
      transition(DELETING, true);
      props
       .cancelInterview(props.id)
       .then(() => transition(EMPTY))
       .catch(error => transition(ERROR_DELETE, true));
     }

    // let response = await props.cancelInterview(props.id, interview)
    // .then((res) => {
    //   transition(EMPTY);
    //   // return true;
    // }).catch((err) => {
    //   transition(ERROR_DELETE);
    // });
  //}

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY &&
      <Empty
        onAdd={() =>
          transition(CREATE)
        }
        
      />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer} //this is straight from compass....
          // interviewer={props.interview} //This saves but without showing the interviewer/student name
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() =>
            back(EMPTY)
          }
          onSave={save}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message={'Confirm?'}
          onCancel={() =>
            back(EMPTY)
          }
          onConfirm={remove}
        />
      )}
      {mode === EDIT && (
        <Form
          student = {props.interview.student}
          interviewers = {props.interviewers}
          interviewer = {props.interview.interviewer.id}
          onCancel={() =>
            back(EMPTY)
          }
          onSave={save}
        />
      )}
      {mode === SAVING && (
        <Status message="Saving"/>
      )}
      {mode === DELETING && (
        <Status message="Deleting"/>
      )}
      {mode === ERROR_SAVE && (
        <Error 
          message={"Saving error"}
          onClose={() => {back(); back();}}
          />
      )}
      {mode === ERROR_DELETE && (
        <Error 
          message={"Deleting error"}
          onClose={() => {back(); back();}}
        />
      )}
    </article>
  );
};



// import React from "react";
// import "./styles.scss";
// import Header from "./Header";
// import Empty from "./Empty";
// import Show from "./Show";
// // import { useVisualMode } from "/src/components/hooks/useVisualMode";
// import useVisualMode from "../../hooks/useVisualMode";
// import Form from "./Form";


// const EMPTY = "EMPTY";
// const SHOW = "SHOW";
// const CREATE = "CREATE";


// export default function Appointment(props) {
  
//     const { mode, transition, back } = useVisualMode(
  
//       props.interview ? SHOW : EMPTY
//     );

// //console.log(props);
// return (
//   <article className="appointment">
//     <Header time={props.time} />
//     {mode === EMPTY &&
//     <Empty
//       onAdd={() =>
//         transition(CREATE)
//       }
      
//     />}
//     {mode === SHOW && (
//       <Show
//         student={props.interview.student}
//         interviewer={props.interview.interviewer}
//       />
//     )}
//     {mode === CREATE && (
//       <Form
//         interviewers={[]}
//         onCancel={() =>
//           back(EMPTY)
//         }
//       />
//     )}
//   </article>
// );
// }

//outer brace is anonymous component

//when a component first loads, it has to mount. Once mounted, it can do anything. One of the things could be making a network request for instance. The way to do so is using a useEffect.
//The way it works is that it runs every time a component //takes a function // array of dependcies -> it it's empty, it will run only once - only on mount. Runs whenever a component updates. there can be multiple in the dependency array.