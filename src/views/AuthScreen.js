import LoginInputs from "components/Authentication/LoginInputs";
import RegistrationInputs from "components/Authentication/RegistrationInputs";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Button,
  ButtonGroup,
  Row,
  CardFooter,
} from "reactstrap";
import { registerUser } from "store/actions/userActions";
import { fetchUserData } from "store/actions/userActions";
import logo from "../assets/img/logo.png";

const AuthScreen = (props) => {
  const [isRegistering, setToRegistering] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const loginUser = async (data) => {
    try {
      dispatch(
        fetchUserData({
          username: data.username.value,
          password: data.password.value,
        })
      );
      return history.push("/home");
    } catch (err) {
      console.log(err);
    }
  };

  const register = (data) => {
    const details = {
      user: {
        username: data.username.value,
        password: data.password.value,
        first_name: data.first_name.value,
        last_name: data.last_name.value,
      },
      dog: {
        name: data.dog_name.value,
        age: data.dog_age.value,
        breed: data.dog_breed.value,
        vaccinated: data.vaccinated?.value === "on",
        microchipped: data.microchipped?.value === "on",
        last_vaccinated: data.last_vaccinated.value,
        image: data.dog_image.files[0].name,
      },
    };
    try {
      dispatch(registerUser(details));
      return history.push("/home");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Container
        fluid
        style={{
          background: "linear-gradient(150deg, #ffc107 40%, #fff)",
          minHeight: "100vh",
          padding: 0,
          display: "flex",
        }}
      >
        <Col style={{ margin: "auto" }}>
          <Row>
            <Col
              md={{
                offset: 2,
                size: 7,
              }}
            >
              <Card body className="text-center">
                <CardTitle tag="h2">Paws</CardTitle>
                <hr />
                <CardBody>
                  <img src={logo} width="300" height="300" />
                </CardBody>
                <CardFooter>
                  <i>- Your Personal Dog Assistant</i>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Col>

        <Col style={{ margin: "1rem 0" }}>
          <Card
            style={{ height: "100%", overflow: "hidden" }}
            className="text-center"
          >
            <CardTitle
              tag="h1"
              style={{ backgroundColor: "grey", color: "white" }}
            >
              {isRegistering ? "Registration Page" : "Login Page"}
            </CardTitle>
            <Card>
              <ButtonGroup>
                <Button color="primary" onClick={() => setToRegistering(false)}>
                  Login
                </Button>
                <Button color="primary" onClick={() => setToRegistering(true)}>
                  Register
                </Button>
              </ButtonGroup>
            </Card>
            <CardBody style={{ height: "75%", display: "flex" }}>
              <Col
                md={{
                  offset: 2,
                  size: 8,
                }}
                style={{ margin: "auto" }}
              >
                {isRegistering ? (
                  <RegistrationInputs onSubmitForm={register} />
                ) : (
                  <LoginInputs onSubmitForm={loginUser} />
                )}
              </Col>
            </CardBody>
          </Card>
        </Col>
      </Container>
    </>
  );
};

export default AuthScreen;
