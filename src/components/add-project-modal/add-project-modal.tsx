import React, { ChangeEvent, useState } from 'react';
import styles from './add-project-modal.module.scss';
import Modal from '../modal/modal';

type AddProjectModalProps = {
  addProjectHandler: (projectName: string, projectDescription: string) => void;
  closeAddProjectModal: () => void;
};

const AddProjectModal = ({
  addProjectHandler,
  closeAddProjectModal,
}: AddProjectModalProps): React.JSX.Element => {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [isValidInput, setIsValidInput] = useState(true);

  const validateInput = () => {
    if (projectName === '' || projectDescription === '') {
      setIsValidInput(false);
    } else {
      addProjectHandler(projectName, projectDescription);
    }
  };

  return (
    <Modal closeModalHandler={closeAddProjectModal}>
      <div className={styles.form}>
        <div className={styles.formInput}>
          <label htmlFor="projectName">Project Name</label>
          <input
            type="text"
            name="projectName"
            id="projectName"
            value={projectName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setProjectName(e.target.value);
            }}
          />
        </div>

        <div className={styles.formInput}>
          <label htmlFor="projectDescription">Project Description</label>
          <input
            type="text"
            name="projectDescription"
            id="projectDescription"
            value={projectDescription}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setProjectDescription(e.target.value);
            }}
          />
        </div>
        {!isValidInput && (
          <div className={styles.error_message}>
            Inputs cannot be empty please fill data
          </div>
        )}

        <button onClick={validateInput}> Add Project</button>
      </div>
    </Modal>
  );
};

export default AddProjectModal;
