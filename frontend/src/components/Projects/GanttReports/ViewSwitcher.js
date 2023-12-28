import React from "react";
import "gantt-task-react/dist/index.css";
import { ViewMode } from "gantt-task-react";
import {Button,Input,Checkbox} from '@nextui-org/react'

const Buttonmargin = 'mr-5'

const ViewSwitcher = ({
  onViewModeChange,
  onViewListChange,
  isChecked
}) => {
  return (
    <div className="ViewContainer mt-10">
      <Button
        className={`${Buttonmargin}`}
        onClick={() => onViewModeChange(ViewMode.QuarterDay)}
      >
        Quarter of Day
      </Button>
      <Button
        className={`${Buttonmargin}`}
        onClick={() => onViewModeChange(ViewMode.HalfDay)}
      >
        Half of Day
      </Button>
      <Button className={`${Buttonmargin}`} onClick={() => onViewModeChange(ViewMode.Day)}>
        Day
      </Button>
      <Button
        className={`${Buttonmargin}`}
        onClick={() => onViewModeChange(ViewMode.Week)}
      >
        Week
      </Button>
      <Button
        className="Button"
        onClick={() => onViewModeChange(ViewMode.Month)}
      >
        Month
      </Button>

      <div>

        <Checkbox className="m-2" defaultSelected={isChecked}  onClick={() => onViewListChange(!isChecked)}>Show Task List</Checkbox>
      </div>
    </div>
  );
};

export default ViewSwitcher;
