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
        <h2>{taskData.taskTitle}</h2>
        <p className={styles.label}>{'Description:'}</p>
        <p className={styles.task_description}>{taskData.taskDescription}</p>
      </div>
    </Modal>
  );
};

export default TaskModal;
