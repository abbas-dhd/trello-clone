import { TaskType } from '../../types/types';
import Modal from '../modal/modal';
import styles from './task-modal.module.scss';

type TaskModalProps = {
  taskData: TaskType;
  closeTaskModalHandler: () => void;
};

const TaskModal = ({ taskData, closeTaskModalHandler }: TaskModalProps) => {
  return (
    <Modal closeModalHandler={closeTaskModalHandler}>
      <div className={styles.task_info}>
        <span>#{taskData.taskId}</span>
        <h1>{taskData.taskTitle}</h1>
        <p>{taskData.taskDescription}</p>
      </div>
    </Modal>
  );
};

export default TaskModal;
