import React from "react";
import "components/DayListItem.scss";
const classNames = require('classnames');

export default function DayListItem(props) {

  const dayListItemClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  const formatSpots = function(numSpots) {
    if (numSpots === 0) {
      return `no spots remaining`;
    }
    if (numSpots === 1) {
      return `1 spot remaining`;
    }
    return `${numSpots} spots remaining`;
  }

  return (
    //Use the onClick event handler to handle the click event that sets the day
    <li 
      className={dayListItemClass}
      onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
