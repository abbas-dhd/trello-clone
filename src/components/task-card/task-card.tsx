import styles from './task-card.module.scss';
import { useState } from 'react';
import { TaskType } from '../../types/types';
import TaskModal from '../task-modal/task-modal';
import { Draggable } from '@hello-pangea/dnd';

type TaskCardProps = {
  taskData: TaskType;
  taskIndex: number;
};

const TaskCard = ({ taskData, taskIndex }: TaskCardProps) => {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState<boolean>(false);

  const openTaskModalHandler = () => {
    setIsTaskModalOpen(true);
  };
  const closeTaskModalHandler = () => {
    setIsTaskModalOpen(false);
  };
  return (
    <>
      <Draggable draggableId={taskData.taskId} index={taskIndex}>
        {(provided) => {
          return (
            <div
              className={styles.task_card}
              onClick={openTaskModalHandler}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              {taskData.taskTitle ?? ''}
            </div>
          );
        }}
      </Draggable>
      {isTaskModalOpen && (
        <TaskModal
          taskData={taskData}
          closeTaskModalHandler={closeTaskModalHandler}
        />
      )}
    </>
  );
};

export default TaskCard;
