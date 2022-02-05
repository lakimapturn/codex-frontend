import React, { useEffect, useRef, useState } from "react";

// reactstrap components
import {
  Row,
  Col,
  Button,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Input,
} from "reactstrap";

// core components
import PanelHeader from "components/Layout/PanelHeader.js";
import QuestionItem from "components/QuestionItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions } from "store/actions/QAActions";
import { askQuestion } from "store/actions/QAActions";
import Loading from "components/Loading";

const CommunityPage = (props) => {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions.question_response);
  const questionsFetching = useSelector((state) => state.questions.isFetching);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const question = useRef();

  useEffect(() => {
    dispatch(fetchQuestions());
  }, []);

  const createQuestion = () => {
    dispatch(askQuestion(question.current.value.trim(), 1));
    setModalIsOpen(false);
  };

  return (
    <>
      <Loading loading={questionsFetching} />
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
        <div
          style={{
            position: "fixed",
            bottom: 10,
            right: "2%",
          }}
        >
          <Button
            color="primary"
            style={{ borderRadius: "51%" }}
            onClick={() => setModalIsOpen(true)}
          >
            <h2 style={{ margin: 0 }}>+</h2>
          </Button>
        </div>
      </div>
      <Modal
        centered
        fullscreen="xl"
        scrollable
        size="xl"
        toggle={() => setModalIsOpen(false)}
        isOpen={modalIsOpen}
      >
        <ModalHeader toggle={() => setModalIsOpen(true)}>
          Add Your Question Here!
        </ModalHeader>
        <ModalBody>
          <Input
            placeholder="Enter Your Question"
            rows={5}
            type="textarea"
            innerRef={question}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={createQuestion}>
            Ask Question
          </Button>
          <Button onClick={() => setModalIsOpen(false)}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default CommunityPage;
