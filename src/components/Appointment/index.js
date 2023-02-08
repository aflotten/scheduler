import React from "react";
import useVisualMode from "hooks/useVisualMode";
import styles from "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment(props) {

  const displayAppointment = props.interview ? <Show {...props}/> : <Empty />;

  return(
    <article className="appointment">
      <Header time={props.time}/>
      {displayAppointment}
    </article>
  );
};