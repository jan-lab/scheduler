import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {

  const dayListItems = props.days.map((day) => { //props.days -> refer to DayList attributes in stories to see what you can use after props.

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

  return <ul>{dayListItems}</ul>;

}