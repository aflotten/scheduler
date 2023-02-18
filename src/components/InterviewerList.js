import React from "react";
import PropTypes from 'prop-types';
import "components/InterviewerList.scss"
import DayListItem from "./DayListItem";
import InterviewerListItem from "./InterviewerListItem";


function InterviewerList(props) {


  const listInterviewers = props.interviewers.map((interviewer) => {
    return(
    <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.value}
      setInterviewer={() => {props.onChange(interviewer.id)}}
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

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;