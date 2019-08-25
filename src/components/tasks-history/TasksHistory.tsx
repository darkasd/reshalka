import React from 'react';
import { TaskResultData } from '../../models/TaskResultData';

export interface TasksHistoryProps {
    Tasks: TaskResultData[]
}

const TasksHistory: React.FC<TasksHistoryProps> = (props) => {
  return (
      <div>
          <h3>Всего решено: {props.Tasks.filter(t => t.IsSuccess === true).length}</h3>
          {props.Tasks.map((t, i) => <p key={i}>{`${t.TaskText} = ${t.Answer}`}</p>)}
      </div>
  );
}

export default TasksHistory;