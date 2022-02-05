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
  const [showDetails, setShowDetails] = useState(false);
  const [selectedFood, setSelectedFood] = useState();

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
                              src={`https://codex-django-backend.herokuapp.com${food.brand_logo}`}
                              alt="company-logo"
                              height={100}
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
              <Card inverse color="dark">
                <Col>
                  <img src={selectedFood?.brand_logo} />
                </Col>
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
          <Button onClick={() => setSelectedFood(null)}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Foods;
