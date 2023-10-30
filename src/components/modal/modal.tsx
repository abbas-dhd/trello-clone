import styles from './modal.module.scss';
import React from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
  closeModalHandler: () => void;
  children: React.ReactNode | React.ReactNode[];
};

const Modal = ({
  children,
  closeModalHandler,
}: ModalProps): React.JSX.Element => {
  return createPortal(
    <div className={styles.modal_container} onClick={closeModalHandler}>
      <div
        className={styles.modal_card}
        onClick={(e) => {
          // This is to prevent the modal from closing when clicking on the modal card
          e.stopPropagation();
        }}
      >
        <div className={styles.closeButton} onClick={closeModalHandler}>
          X
        </div>
        <div className={styles.modal_content}>{children}</div>
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLElement
  );
};

export default Modal;
