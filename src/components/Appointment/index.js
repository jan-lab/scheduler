//import necessary libraries, styles, and components
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

//create constants to use as modes
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
  //if interview exists, render the SHOW mode. If not, render the EMPTY mode.
  const { mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  //create a save function
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    
    //render the SAVING mode
    transition(SAVING);
    
    //if bookInterview is successful, render the SHOW mode. If not, render the ERROR_SAVE mode.
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }

  //create a remove function
  function remove(event) {
    //renders the DELETING mode
    transition(DELETING, true);
    //if cancelInverview is successful, render the EMPTY mode. If not, render the ERROR_DELETE mode.
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  }


  return (
    <article className="appointment" data-testid="appointment">
      <Header 
        time={props.time} 
      />
      {mode === EMPTY &&
        <Empty
        onAdd={() =>
          transition(CREATE)
        } 
        />
      }
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
          message={"Are you sure you would like to delete?"}
          onCancel={() =>
            back(EMPTY)
          }
          onConfirm={remove}
        />
      )}
      {mode === EDIT && (
        <Form
        //left side are the names of the prop that are passed to the Form component
        //right side are the values that are assigned to the prop names.
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
}