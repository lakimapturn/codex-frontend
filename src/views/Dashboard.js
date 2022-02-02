import React, { useEffect, useState } from "react";
// react plugin used to create charts
import "../assets/css/styles.css";
import { Line, Bar } from "react-chartjs-2";

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
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchDogData } from "store/actions/dogActions";
import { important_tasks } from "constants/data";
import TaskItem from "components/TaskItem";
import { fetchUserData } from "store/actions/userActions";

const Dashboard = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserData());
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

  const myDog = useSelector((state) => state.user.userData);

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
      <PanelHeader
        // size="lg"
        // content={
        //   <Line
        //     data={dashboardPanelChart.data}
        //     options={dashboardPanelChart.options}
        //   />
        // }
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
                    src={`http://localhost:8000${myDog.dog_owned?.profile_picture}`}
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
                          {myDog.dog_owned?.name}
                        </p>
                      </h4>
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <div
                  // className="chart-area"
                  style={{
                    marginLeft: "13%",
                  }}
                >
                  <h5>I AM</h5>
                  <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                    <li>
                      <h6>{myDog.dog_owned?.age} years old</h6>
                    </li>
                    <li>
                      <h6>A {myDog.dog_owned?.breed}</h6>
                    </li>
                    {myDog.dog_owned?.vaccinated && (
                      <li>
                        <h6>Vaccinated!</h6>
                      </li>
                    )}
                    {myDog.dog_owned?.microchipped && (
                      <li>
                        <h6>Microchipped!</h6>
                      </li>
                    )}
                  </ul>
                </div>
              </CardBody>
              {/* <CardFooter>
                <div className="stats"></div>
              </CardFooter> */}
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
                <div className="stats">
                  <i className="now-ui-icons loader_refresh spin" /> Updated 3
                  minutes ago
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Dashboard;
