import React from "react";
import "components/InterviewerList.scss"
import DayListItem from "./DayListItem";
import InterviewerListItem from "./InterviewerListItem";
import { action } from "@storybook/addon-actions";

export default function interviewerList(props) {
console.log(props);

  const listInterviewers = props.interviewers.map((interviewer) => {
    return(
    <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={props.interviewer === interviewer.id}
      setInterviewer={() => props.setInterviewer(interviewer.id)}
      />
    )
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
          {listInterviewers}
      </ul>
    </section>
  )
}