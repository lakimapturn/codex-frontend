// reactstrap components
import {
  Button,
  Label,
  FormGroup,
  Input,
  UncontrolledTooltip,
} from "reactstrap";

const TaskItem = (props) => {
  return (
    <tr key={props.data.id}>
      <td>
        <FormGroup check>
          <Label check>
            <Input
              defaultChecked={props.data.completed}
              type="checkbox"
              onClick={() => props.onCompleteTask(props.data)}
            />
            <span className="form-check-sign" />
          </Label>
        </FormGroup>
      </td>
      <td className="text-left">{props.data.text}</td>
      <td className="td-actions text-right">
        <Button
          className="btn-round btn-icon btn-icon-mini btn-neutral"
          color="danger"
          id="tooltip923217206"
          type="button"
        >
          <i className="now-ui-icons ui-1_simple-remove" />
        </Button>
        <UncontrolledTooltip delay={0} target="tooltip923217206">
          Remove
        </UncontrolledTooltip>
      </td>
    </tr>
  );
};

export default TaskItem;
