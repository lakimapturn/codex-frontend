import { Modal, ModalBody, Spinner } from "reactstrap";
import FunFact from "./FunFact";

const Loading = (props) => {
  return (
    <>
      <Modal isOpen={props.loading} centered>
        <ModalBody className="text-center">
          <Spinner>Loading...</Spinner>
        </ModalBody>
        <FunFact />
      </Modal>
    </>
  );
};

export default Loading;
