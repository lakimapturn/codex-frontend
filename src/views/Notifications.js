import React, { useEffect } from "react";
// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";

// reactstrap components
import { Row, Col } from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import QuestionItem from "components/QuestionItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions } from "store/actions/QAActions";

function Notifications() {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions.question_response);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, []);

  return (
    <>
      <PanelHeader
        content={
          <div className="header text-center">
            <h2 className="title">Community Questions</h2>
          </div>
        }
      />
      <div className="content">
        <Row>
          <Col md={12} xs={12}>
            {questions?.map((question) => (
              <QuestionItem key={question.id} question={question} />
            ))}
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Notifications;
