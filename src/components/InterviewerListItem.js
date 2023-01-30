import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function interviewerListItem(props) {

const interviewerClass = classNames("interviewers__item", {
  "interviewers__item--selected": props.selected
});


  return (
    <li onClick={props.setInterviewer} selected={props.selected} className={interviewerClass}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  )
}