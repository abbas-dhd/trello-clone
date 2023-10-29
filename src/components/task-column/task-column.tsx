import { useState } from 'react';
import { StatusColumnType } from '../../types/types';
import TaskCard from '../task-card/task-card';
import styles from './task-column.module.scss';
import { AddTask } from '../add-task/add-task';
import { useAppDispatch } from '../../redux/hooks';
import { addTaskToProject } from '../../redux/slices/projectsDataSlice';
import { Droppable } from '@hello-pangea/dnd';

type TaskColumnProps = {
  columnData: StatusColumnType;
  projectId: string;
};

const TaskColumn = ({ columnData, projectId }: TaskColumnProps) => {
  const [isAddingTask, setIsAddingTask] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const taskSubmitHandler = (taskTitle: string, taskDescription: string) => {
    dispatch(
      addTaskToProject({
        taskTitle,
        taskDescription,
        columnId: columnData.columnId,
        projectId,
      })
    );
    setIsAddingTask(false);
  };

  return (
    <div className={styles.task_column}>
      <div className={styles.columnTitle}>
        <h3>{columnData.columnLabel}</h3>
      </div>

      <Droppable droppableId={columnData.columnId}>
        {(provided) => (
          <div
            className={styles.card_container}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {columnData.tasks.map((task, index) => (
              <TaskCard taskData={task} key={task.taskId} taskIndex={index} />
            ))}
            {provided.placeholder}
            {isAddingTask && (
              <AddTask
                closeTaskFormHandler={() => {
                  setIsAddingTask(false);
                }}
                submitHandler={taskSubmitHandler}
              />
            )}
          </div>
        )}
      </Droppable>

      <div
        style={{ height: '50px', border: '2px solid red' }}
        onClick={() => {
          setIsAddingTask(true);
        }}
      >
        + Add Task
      </div>
    </div>
  );
};

export default TaskColumn;
