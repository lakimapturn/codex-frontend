import {
  Form,
  FormGroup,
  Label,
  Input,
  InputGroupText,
  InputGroup,
  Button,
  Alert,
} from "reactstrap";

import { FaUser, FaLock } from "react-icons/fa";
import { useState } from "react";

const LoginInputs = (props) => {
  const [message, setMessage] = useState("");

  return (
    <>
      <Form
        onSubmit={(event) => {
          event.preventDefault();
          props.onSubmitForm(event.target);
        }}
      >
        <FormGroup>
          <Label tag="h6">Username</Label>
          <InputGroup>
            <InputGroupText>
              <FaUser size={20} />
            </InputGroupText>
            <Input name="username" type="text" required minLength="2" />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label tag="h6">Password</Label>
          <InputGroup>
            <InputGroupText>
              <FaLock size={20} />
            </InputGroupText>
            <Input name="password" type="password" required minLength="2" />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Button color="primary" type="submit">
            Login
          </Button>
        </FormGroup>
      </Form>
      {message && <Alert color="danger">{message}</Alert>}
    </>
  );
};

export default LoginInputs;
