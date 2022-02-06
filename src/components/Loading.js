import { Modal, ModalBody, ModalHeader } from "reactstrap";
import FunFact from "./FunFact";
import loading1 from "../assets/gifs/loading1.gif";
import loading2 from "../assets/gifs/loading2.gif";
import loading3 from "../assets/gifs/loading3.gif";
import loading4 from "../assets/gifs/loading4.gif";

const Loading = (props) => {
  const loadingGifs = [loading1, loading2, loading3, loading4];
  return (
    <>
      <Modal isOpen={props.loading} centered>
        <ModalHeader className="text-center" tag="h5">
          Loading...
        </ModalHeader>
        <ModalBody className="text-center">
          <img
            src={loadingGifs[Math.floor(Math.random() * loadingGifs.length)]}
          />
        </ModalBody>
        <FunFact />
      </Modal>
    </>
  );
};

export default Loading;
