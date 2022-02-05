import { Row, Col, Card, CardFooter, CardTitle, CardText } from "reactstrap";
import { facts } from "constants/data";

const FunFact = (props) => {
  return (
    <Row>
      <Col
        md={{
          offset: 3,
          size: 6,
        }}
        sm="12"
      >
        <Card className="text-center" body>
          <CardTitle tag="h4">Did You Know?</CardTitle>
          <CardText tag="h6">
            {facts[Math.floor(Math.random() * facts.length)].fact}{" "}
          </CardText>
          <CardFooter />
        </Card>
      </Col>
    </Row>
  );
};

export default FunFact;
