import React, { useEffect } from "react";

// reactstrap components
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

// import { thead, tbody } from "variables/general";
import { useDispatch, useSelector } from "react-redux";
import { fetchFoods } from "store/actions/dogActions";
import { TiChevronRight } from "react-icons/ti";
import { starRating } from "constants/functions";

function RegularTables() {
  const dispatch = useDispatch();
  const foods = useSelector((state) => state.dog.dogFood);

  useEffect(() => {
    dispatch(fetchFoods());
  }, [dispatch]);

  return (
    <>
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
                      <th>Brand</th>
                      <th>Food Name</th>
                      <th>Price Range</th>
                      <th>Rating</th>
                      <th>View Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {foods.map((food) => (
                      <tr>
                        <th scope="row">
                          <img
                            src={`http://localhost:8000${food.brand_logo}`}
                            alt="company-logo"
                            height={100}
                            width={100}
                          />
                        </th>
                        <td>
                          <h6>{food.name}</h6>
                        </td>
                        <td>
                          <h6>{food.price}</h6>
                        </td>
                        <td>{starRating(food.rating)}</td>
                        <td>
                          <TiChevronRight
                            size={60}
                            onClick={() => alert("Redirecting...")}
                            style={{ cursor: "pointer" }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default RegularTables;
