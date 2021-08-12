import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  //for each day list items, return the DayListItem component with the needed props.
  const dayListItems = props.days.map((day) => { 

    return (
      <DayListItem 
        key={day.id}
        name={day.name} 
        spots={day.spots} 
        selected={day.name === props.day}
        setDay={props.setDay}  
      />
    );
  })

  //render the dayListItems in an unordered list
  return <ul>{dayListItems}</ul>;

};