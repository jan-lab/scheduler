import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";
import PropTypes from 'prop-types';


function InterviewerList(props) {
  console.log(props);
  // props.toString()
  const interviewers = props.interviewers.map((interviewer) => { //props.interviewers -> refer to InterviewerList attributes in stories to see what you can use after props.
    return (
            <InterviewerListItem
              key={interviewer.id}
              name={interviewer.name}
              avatar={interviewer.avatar}
              selected={interviewer.id === props.interviewer}
              setInterviewer={event => props.setInterviewer(interviewer.id)}/>
          );
    });
        
  return (
          <section className="interviewers">
            <h4 className="interviewers__header text--light">Interviewer</h4>
            <ul className="interviewers__list">{interviewers}</ul>
          </section>
        );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList

// export default function DayList(props) {

//   const dayListItems = props.days.map((day) => { //props.days -> refer to DayList attributes in stories to see what you can use after props.

//   return (
//       <DayListItem 
//         key={day.id}
//         name={day.name} 
//         spots={day.spots} 
//         selected={day.name === props.day}
//         setDay={props.setDay}  
//       />
//     );
//   })

//   return <ul>{dayListItems}</ul>;

// }