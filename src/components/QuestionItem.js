import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Card,
  CardTitle,
  CardBody,
  Button,
  CardFooter,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Collapse,
  Input,
  CardText,
} from "reactstrap";

import { answerQuestion } from "../store/actions/QAActions";

const QuestionItem = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [viewDiscussion, setViewDiscussion] = useState(false);
  const answer = useRef();

  const dispatch = useDispatch();
  const submitAnswer = () => {
    dispatch(answerQuestion(props.question.id, answer.current.value.trim(), 1));
    setModalIsOpen(false);
    setViewDiscussion(false);
  };

  return (
    <>
      <Card
        key={props.question.id}
        className="text-center"
        color={props.question.answers.length > 0 ? "dark" : ""}
        inverse={props.question.answers.length > 0}
      >
        <CardBody>
          <CardTitle tag="h5">Q) {props.question.question}</CardTitle>
          <Button
            color="danger"
            onClick={() => setViewDiscussion((prevState) => !prevState)}
          >
            {viewDiscussion ? "Hide Discussion" : "View Discussion"}
          </Button>
        </CardBody>
        <CardFooter className="text-muted">
          Asked by {props.question.asked_by.first_name}{" "}
          {props.question.asked_by.last_name}
        </CardFooter>
      </Card>
      <div style={{ width: "95%", margin: "auto" }}>
        <Collapse isOpen={viewDiscussion}>
          <Card className="text-center">
            <CardBody>
              {props.question.answers.length > 0 ? (
                props.question.answers.map((answer) => (
                  <Card key={answer.id}>
                    <CardBody className="text-left">
                      <h4 style={{ margin: 0 }}>{answer.response}</h4>
                    </CardBody>
                    <CardFooter className="text-center">
                      <img
                        src={`http://localhost:8000${answer.response_by.dog_owned.picture}`}
                        alt="dog-pic"
                        height="30"
                        width="30"
                        style={{ borderRadius: "50%" }}
                      />
                      {"  "}
                      Commented By {answer.response_by.first_name}{" "}
                      {answer.response_by.last_name} (Proud Owner of a{" "}
                      {answer.response_by.dog_owned.breed})
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <h4 margin={{ margin: 0 }}>Be The First To Add An Answer!</h4>
              )}
            </CardBody>
            <Button color="primary" onClick={() => setModalIsOpen(true)}>
              Add A Comment
            </Button>
          </Card>
        </Collapse>
      </div>

      <div>
        <Modal
          centered
          fullscreen="xl"
          scrollable
          size="xl"
          toggle={() => setModalIsOpen(false)}
          isOpen={modalIsOpen}
        >
          <ModalHeader toggle={() => setModalIsOpen(true)}>
            Q) {props.question.question}
          </ModalHeader>
          <ModalBody>
            <Input
              placeholder="Enter Your Answer"
              rows={5}
              type="textarea"
              innerRef={answer}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={submitAnswer}>
              Submit Comment
            </Button>
            <Button onClick={() => setModalIsOpen(false)}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
};

export default QuestionItem;
