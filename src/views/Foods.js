import React, { useEffect, useState } from "react";

// reactstrap components
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Row,
  Col,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Modal,
} from "reactstrap";

// core components
import PanelHeader from "components/Layout/PanelHeader.js";

// import { thead, tbody } from "variables/general";
import { useDispatch, useSelector } from "react-redux";
import { fetchFoods } from "store/actions/dogActions";
import { starRating } from "constants/functions";

import Loading from "components/Loading";

const Foods = (props) => {
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.dog);
  const [selectedFood, setSelectedFood] = useState();
  const userDog = useSelector((state) => state.user.userData.dog_owned);

  useEffect(() => {
    dispatch(fetchFoods());
  }, [dispatch]);

  return (
    <>
      <Loading loading={tableData.isDogDataFetching} />
      <PanelHeader
        content={
          <div className="header text-center">
            <h2 className="title">Foods</h2>
          </div>
        }
      />
      <div className="content">
        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Suggested Foods For Your Dog</CardTitle>
              </CardHeader>
              <CardBody>
                <Table
                  responsive
                  striped
                  bordered
                  borderless
                  className="text-center"
                >
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Brand</th>
                      <th>Price Range</th>
                      <th>Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.dogFood?.map((food) => (
                      <>
                        <tr>
                          <th scope="row">
                            <img
                              src={`http://127.0.0.1:8000${food.brand_logo}`}
                              alt="company-logo"
                              height={110}
                              width={100}
                            />
                          </th>
                          <td>
                            <h5>{food.brand}</h5>
                          </td>
                          <td>
                            <h5>{food.price}</h5>
                          </td>
                          <td>{starRating(food.rating)}</td>
                          <td>
                            <Button
                              color="primary"
                              onClick={() => setSelectedFood(food)}
                            >
                              {selectedFood ? "Hide Details" : "View Details"}
                            </Button>
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
      <Modal
        centered
        fullscreen="xl"
        scrollable
        size="xl"
        toggle={() => setSelectedFood(null)}
        isOpen={selectedFood}
      >
        <ModalHeader toggle={() => setSelectedFood(null)}>
          <CardTitle tag="h5">{selectedFood?.brand}</CardTitle>
        </ModalHeader>
        <ModalBody>
          <Card className="text-center">
            <CardBody>
              <Card inverse color="dark" body>
                <Row>
                  <Col>
                    <img
                      src={`http://127.0.0.1:8000${selectedFood?.brand_logo}`}
                      alt="logo-img"
                      height={300}
                      width={270}
                    />
                  </Col>
                  <Col style={{ margin: "auto" }}>
                    <p>
                      <h6>Recommended For:</h6> {userDog?.breed}
                    </p>
                    <p>
                      <h6>Price:</h6> {selectedFood?.price}
                    </p>
                    <p>
                      <h6>Ingredients:</h6> {selectedFood?.ingredients}
                    </p>
                    <p>
                      <h6>Rating:</h6>{" "}
                      {selectedFood && starRating(selectedFood?.rating)}
                    </p>
                  </Col>
                </Row>
              </Card>
            </CardBody>
          </Card>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => (location.href = selectedFood?.url)}
          >
            Visit Website
          </Button>{" "}
          <Button onClick={() => setSelectedFood(null)}>Go Back</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Foods;
