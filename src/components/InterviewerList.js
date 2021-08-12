import React from "react";
//import the InterviewerListItem component
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";
import PropTypes from 'prop-types';


function InterviewerList(props) {

  //for each of the interviewers, return the InterviewerListITem component with necessary props
  const interviewers = props.interviewers.map((interviewer) => {  
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.interviewer}
        setInterviewer={event => props.setInterviewer(interviewer.id)}
      />
    );
  });
        
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
}

//typechecking
InterviewerList.propTypes = {
  //chain with `isRequired` to make sure a warning is shown if the interviewers is not an array
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;