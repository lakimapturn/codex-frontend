const FoodList = (props) => {
  return (
    <Row>
      <Col xs={12} md={6}>
        <Card>
          <CardHeader>
            <h5 className="card-category">All Persons List</h5>
            <CardTitle tag="h4">Employees Stats</CardTitle>
          </CardHeader>
          <CardBody>
            <Table responsive>
              <thead className="text-primary">
                <tr>
                  <th>Name</th>
                  <th>Country</th>
                  <th>City</th>
                  <th className="text-right">Salary</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Dakota Rice</td>
                  <td>Niger</td>
                  <td>Oud-Turnhout</td>
                  <td className="text-right">$36,738</td>
                </tr>
                <tr>
                  <td>Minerva Hooper</td>
                  <td>Curaçao</td>
                  <td>Sinaai-Waas</td>
                  <td className="text-right">$23,789</td>
                </tr>
                <tr>
                  <td>Sage Rodriguez</td>
                  <td>Netherlands</td>
                  <td>Baileux</td>
                  <td className="text-right">$56,142</td>
                </tr>
                <tr>
                  <td>Doris Greene</td>
                  <td>Malawi</td>
                  <td>Feldkirchen in Kärnten</td>
                  <td className="text-right">$63,542</td>
                </tr>
                <tr>
                  <td>Mason Porter</td>
                  <td>Chile</td>
                  <td>Gloucester</td>
                  <td className="text-right">$78,615</td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};
