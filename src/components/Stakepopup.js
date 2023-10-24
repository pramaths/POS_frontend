import React, { useState, useRef } from "react";
import styles from "../styles/StakePopup.module.css"

function StakePopup({ onClose }) {
  const [amount, setAmount] = useState("");
  const contentRef = useRef(null);

  const handleStake = () => {
    // Handle the staking logic here
    console.log("Staking amount:", amount);
    onClose();
  };

  const handleOverlayClick = (event) => {
    // If the clicked element is directly the overlay and not a descendant of the content
    if (!contentRef.current.contains(event.target)) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.content} ref={contentRef}>
        <button onClick={onClose} className={styles.closeButton}>X</button>
        <h3>Stake ETH</h3>
        <p>Enter the amount you wish to stake:</p>
        <input 
          type="number" 
          value={amount} 
          onChange={e => setAmount(e.target.value)} 
          placeholder="Amount in ETH" 
          className={styles.input}
        />
        <button onClick={handleStake} className={styles.confirmButton}>Confirm</button>
      </div>
    </div>
  );
}

export default StakePopup;
