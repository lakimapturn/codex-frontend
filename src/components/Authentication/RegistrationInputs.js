import {
  Form,
  FormGroup,
  Label,
  Col,
  Input,
  FormText,
  Button,
  Row,
  InputGroupText,
  InputGroup,
} from "reactstrap";

import { FaUser, FaLock } from "react-icons/fa";
import { useEffect } from "react";
import { fetchDogData } from "store/actions/dogActions";
import { useDispatch, useSelector } from "react-redux";

const RegistrationInputs = (props) => {
  const breeds = useSelector((state) => state.dog.dogData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDogData());
  }, [dispatch]);

  const getMaxDate = () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    const dateString = `${date.getFullYear()}-${
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1
    }-${
      date.getDate() + 1 < 10 ? "0" + (date.getDate() + 1) : date.getDate() + 1
    }`;
    return dateString;
  };

  const getMinDate = () => {
    const date = new Date();
    date.setMonth(date.getMonth() - 6);
    const dateString = `${date.getFullYear()}-${
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1
    }-${
      date.getDate() + 1 < 10 ? "0" + (date.getDate() + 1) : date.getDate() + 1
    }`;
    return dateString;
  };

  return (
    <>
      <Form
        onSubmit={(event) => {
          event.preventDefault();
          props.onSubmitForm(event.target);
        }}
      >
        <FormGroup>
          <Row>
            <Col>
              <Label tag="h6">First Name</Label>
              <Input name="first_name" type="text" required />
            </Col>
            <Col>
              <Label tag="h6">Last Name</Label>
              <Input name="last_name" type="text" required />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col>
              <Label tag="h6">Username</Label>
              <InputGroup>
                <InputGroupText>
                  <FaUser size={20} />
                </InputGroupText>
                <Input name="username" type="text" required />
              </InputGroup>
            </Col>
            <Col>
              <Label tag="h6">Password</Label>
              <InputGroup>
                <InputGroupText>
                  <FaLock size={20} />
                </InputGroupText>
                <Input name="password" type="password" required />
              </InputGroup>
            </Col>
          </Row>
        </FormGroup>
        <hr />
        <h3>Details About Your Dog</h3>
        <FormGroup>
          <Row>
            <Col>
              <Label tag="h6">Name</Label>
              <Input name="dog_name" type="text" required minLength="1" />
            </Col>
            <Col xs={3}>
              <Label tag="h6">Age</Label>
              <Input name="dog_age" type="number" min="0" max="15" required />
            </Col>
            <Col>
              <Label tag="h6">Breed</Label>
              <Input name="dog_breed" type="select" required>
                {breeds.map((breed) => (
                  <option key={breed.id} value={breed.name}>
                    {breed.name}
                  </option>
                ))}
              </Input>
            </Col>
          </Row>
        </FormGroup>
        <br />
        <FormGroup check>
          <Row>
            <Col>
              <Input
                type="checkbox"
                name="vaccinated"
                style={{ opacity: 1, visibility: "visible" }}
              />
              <Label tag="h6" check>
                Vaccinated
              </Label>
            </Col>
            <Col>
              <Input
                type="checkbox"
                name="microchipped"
                style={{ opacity: 1, visibility: "visible" }}
              />
              <Label tag="h6" check>
                Microchipped
              </Label>
            </Col>
          </Row>
        </FormGroup>
        <br />

        <FormGroup>
          <Label tag="h6">Date Of Last Vaccination</Label>
          <Input
            name="last_vaccinated"
            type="date"
            min={getMinDate()}
            max={getMaxDate()}
          />
        </FormGroup>
        <FormGroup>
          <Label tag="h6">A Picture Of Your Adorable Pet</Label>
          <Input
            name="dog_image"
            type="file"
            accept=".png, .jpg, .jpeg"
            color="primary"
            required
            style={{
              opacity: 1,
              position: "unset",
              zIndex: 0,
            }}
          />

          <FormText>Accepted Types: PNG, JPG, JPEG</FormText>
        </FormGroup>
        <Button color="primary" type="submit">
          Register
        </Button>
      </Form>
    </>
  );
};

export default RegistrationInputs;
