import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import useVisualMode from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY

  );
console.log('props:',props)
  return (
    <article className="appointment">
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
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={[]}
          onCancel={() =>
            back(EMPTY)
          }
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