import styles from './add-task.module.scss';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

type AddTaskProps = {
  submitHandler: (taskTitle: string, taskDescription: string) => void;
  closeTaskFormHandler: () => void;
};
export const AddTask = ({
  submitHandler,
  closeTaskFormHandler,
}: AddTaskProps) => {
  const [taskTitle, setTaskName] = useState<string>('');
  const [taskDescription, setTaskDescription] = useState<string>('');

  const taskNameRef = useRef<HTMLInputElement>(null);
  const addTaskRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    taskNameRef.current?.focus();
  }, []);

  return (
    <div className={styles.add_task_card} ref={addTaskRef}>
      <div className={styles.taskInput}>
        <label htmlFor="taskName">Task Title</label>
        <input
          ref={taskNameRef}
          type="text"
          name="taskName"
          id="taskName"
          value={taskTitle}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setTaskName(e.target.value);
          }}
        />
      </div>

      <div className={styles.taskInput}>
        <label htmlFor="taskDescription">Task Description</label>
        <input
          type="text"
          name="taskDescription"
          id="taskDescription"
          value={taskDescription}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setTaskDescription(e.target.value);
          }}
        />
      </div>
      <button
        onClick={() => {
          submitHandler(taskTitle, taskDescription);
        }}
      >
        Done
      </button>
      <button onClick={closeTaskFormHandler}>Cancel</button>
    </div>
  );
};
