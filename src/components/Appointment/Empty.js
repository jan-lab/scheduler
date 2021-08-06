import React from "react";

export default function Header(props) {
return(
<main className="appointment__add">
  <img 
    // onClick={() => props.onAdd()}
    className="appointment__add-button"
    src="images/add.png"
    alt="Add"
    onClick={props.onAdd}
  />
</main>
);
}
