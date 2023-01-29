import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {

const interviewerClass = classNames({
  "interviewers__item--selected": props.selected
});

  return (
    <li onClick={() => props.setInterviewer(props.id)} className={interviewerClass}>
      <img
        className="interviewers__item-image"
        src="https://i.imgur.com/LpaY82x.png"
        alt="Sylvia Palmer"
      />
      Sylvia Palmer
    </li>
  )
}