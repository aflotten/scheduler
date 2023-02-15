import React from "react";
import useVisualMode from "hooks/useVisualMode";
import styles from "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETE = "DELETE";
  const ERROR = "ERROR";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW, true))
      .catch(error => {transition(ERROR_SAVE, true)})
  }

  function cancel() {
    transition(DELETE, true);

    props.cancelInterview(props.id)
      .then(() => {transition(EMPTY)})
      .catch(error => {transition(ERROR_DELETE, true)})
  }


  return (
    <article className="appointment" >
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
      <Show
        interview={props.interview}
        onDelete={() => {transition(CONFIRM)}}
        onEdit={() => {transition(CREATE)}}
      />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === SAVING && (
        <Status message="Saving"/>
      )}
      {mode === CONFIRM && (
        <Confirm
        onConfirm={cancel}
        onCancel={back}/>
      )}
      {mode === DELETE && (
        <Status message="DELETING" />
      )}
      {mode === ERROR_SAVE && (
        <Error 
        message={"Could not save your appointment"}
        onClose={back}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
        message={"Could not delete your appointment"}
        onClose={back}
        />
      )}
    </article>
  );
};