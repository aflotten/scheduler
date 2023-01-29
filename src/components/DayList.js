import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const listItems = props.days.map((day) => 
    <ul>
      <DayListItem 
    key={day.id}
    selected={day.name === props.day}
    setDay={props.setDay}
    {...day}
    />
    </ul>
  )
  return (
    <ul>
      {listItems}
    </ul>
  )
}