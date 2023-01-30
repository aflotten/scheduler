import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const listItems = props.days.map((day) =>
      <DayListItem
        selected={day.name === props.day}
        setDay={props.setDay}
        {...day}
      />
  )
  return (
    <ul>
      {listItems}
    </ul>
  )
}