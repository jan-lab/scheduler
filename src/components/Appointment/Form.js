//import the useState hook
import React, { useState } from "react";
//import the Button component
import Button from "components/Button";
//import the InterviewerList component
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  //create state for student, interviewer, and error
  const [name, setName] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  //create a reset function that resets the name to '' and interviewer to null
  const reset = () => {
    setName("");
    setInterviewer(null);
  };

  //create a cancel function that resets the name and interviewer and calls the onCancel function
  const cancel = () => {
    reset();
    props.onCancel();
  }

  //create a validate function that, if the student name exists, saves the student and interviewer info
  function validate() {
    if (!name.length) {
      setError("Student name cannot be blank");
      return;
    }
    //update the Form component to clear the error on successful submission
    setError("");
    props.onSave(name, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="nameOfInputField" //
            type="text"
            placeholder = "Enter Student Name"
            value = {name}
            onChange = {event => setName(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section 
          className="appointment__validation">{error}
        </section>
        <InterviewerList 
          interviewers={props.interviewers} 
          interviewer={interviewer} 
          setInterviewer={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={validate}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}