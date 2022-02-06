import React, { useEffect, useState } from "react";
// react plugin used to create charts
import "../assets/css/styles.css";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Table,
  ListGroupItem,
  ListGroup,
  ListGroupItemHeading,
} from "reactstrap";

// core components
import PanelHeader from "components/Layout/PanelHeader.js";
import { useDispatch, useSelector } from "react-redux";
import { important_tasks } from "constants/data";
import TaskItem from "components/TaskItem";
import Loading from "components/Loading";
import FunFact from "components/FunFact";
import { fetchUserDataId } from "store/actions/userActions";

const HomeScreen = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserDataId(localStorage.getItem("user")));
    getPendingTasks();
  }, [dispatch]);

  const [pendingTasks, setPendingTasks] = useState(important_tasks);

  const getPendingTasks = () => {
    try {
      const tasks = localStorage.getItem("tasks")
        ? JSON.parse(localStorage.getItem("tasks"))
        : null;
      if (tasks) setPendingTasks(tasks);
      else localStorage.setItem("tasks", JSON.stringify(important_tasks));
    } catch (error) {
      console.log(error);
    }
  };

  const onCompleteTaskHandler = (task) => {
    setTimeout(
      () =>
        setPendingTasks((prevState) => {
          task.completed = true;
          localStorage.setItem("tasks", JSON.stringify([...prevState, task]));
          return [...prevState, task];
        }),
      800
    );
  };

  return (
    <>
      <Loading loading={user.isUserDataFetching} />
      <PanelHeader
        content={
          <div className="header text-center">
            <h2 className="title">Home</h2>
          </div>
        }
      />
      <div className="content">
        <Row>
          <Col xs={80} md={6}>
            <Card className="card-tasks">
              <CardHeader>
                <h5 className="card-category">My Dog</h5>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <img
                    src={`https://codex-django-backend.herokuapp.com${user.userData.dog_owned?.picture}`}
                    alt="dog-pic"
                    height={150}
                    width={150}
                    style={{ borderRadius: "50%" }}
                  />
                  <div>
                    <CardTitle>
                      <h4 style={{ display: "flex" }}>
                        Hello! My name is
                        <p style={{ color: "red", marginLeft: 8 }}>
                          {user.userData.dog_owned?.name}
                        </p>
                      </h4>
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <ListGroup flush>
                  <ListGroupItemHeading>I AM</ListGroupItemHeading>
                  <ListGroupItem>
                    {user.userData.dog_owned?.age} years old
                  </ListGroupItem>
                  <ListGroupItem>
                    A {user.userData.dog_owned?.breed}
                  </ListGroupItem>
                  {user.userData.dog_owned?.vaccinated && (
                    <ListGroupItem>Vaccinated!</ListGroupItem>
                  )}{" "}
                  {user.userData.dog_owned?.microchipped && (
                    <ListGroupItem>Microchipped!</ListGroupItem>
                  )}
                </ListGroup>
              </CardBody>
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card className="card-tasks">
              <CardHeader>
                <h5 className="card-category">Important Requirements</h5>
                <CardTitle tag="h4">Pending Tasks</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="table-full-width table-responsive">
                  <Table>
                    <tbody>
                      {pendingTasks
                        .filter((task) => !task.completed)
                        .map((task) => (
                          <TaskItem
                            key={task.id}
                            data={task}
                            onCompleteTask={(task) =>
                              onCompleteTaskHandler(task)
                            }
                          />
                        ))}
                    </tbody>
                  </Table>
                </div>
              </CardBody>
              <CardFooter>
                <hr />
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <FunFact />
      </div>
    </>
  );
};

export default HomeScreen;
