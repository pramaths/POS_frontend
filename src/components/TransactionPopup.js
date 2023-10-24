import React, { useRef } from 'react';
import styles from '../styles/Home.module.css';

const TransactionPopup = ({ onClose }) => {
  const popupContentRef = useRef(null);

  const handleContainerClick = (event) => {
    if (!popupContentRef.current.contains(event.target)) {
      onClose();
    }
  };

  return (
    <div className={styles.popupcontainer} onClick={handleContainerClick}>
      <div className={styles.popupcontent} ref={popupContentRef}>
        <button onClick={onClose} className={styles.closeButton}>
          X
        </button>
        <div>
          <label>Address:</label>
          <input type="text" placeholder="Enter Address" className={styles.inputField} />
          <label>Gas Price:</label>
          <input type="text" placeholder="Enter Gas Price" className={styles.inputField} />
          <label>Amount:</label>
          <input type="text" placeholder="Enter Amount" className={styles.inputField} />
          <label>Data:</label>
          <input type="text" placeholder="Enter Data" className={styles.inputField} />
          <button className={styles.submitButton}>Submit Transaction</button>
        </div>
      </div>
    </div>
  );
};

export default TransactionPopup;
