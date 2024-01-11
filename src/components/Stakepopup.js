import React, { useState, useRef } from "react";
import styles from "../styles/StakePopup.module.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function StakePopup({ onClose }) {
  const [amount, setAmount] = useState("");
  const contentRef = useRef(null);

  // Function to display the toast
  const displayToast = (nonce) => {
    toast.success(`Stake Successfull`, {
      position: 'top-right',
      autoClose: 4000, // 4 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleStake = async() => {
    // Handle the staking logic here
    // Send the data to the server
    const response = await fetch('https://proof-of-stake.onrender.com/api/account/stake', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({amount}),
    });

    if (response.status === 200) {
      console.log('Staked succesfully.');
      toast.success('Staked succesfully.');
      onClose();
      // Handle any further actions on success.
    } else {
      console.error('Error Staking');
      toast.error('Error in Staking');
      // Handle errors.
    }

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
         {/* React-toastify container */}
         
        <button onClick={onClose} className={styles.closeButton}>X</button>
        <h3>Stake ETH</h3>
        <br />
        <p>Enter the amount you wish to stake:</p>
        
        <input 
          type="text" 
          value={amount} 
          onChange={e => setAmount(e.target.value)}
          placeholder="Amount in ETH" 
          className={styles.input}
        />
        <div className="buttonDiv">
          <button onClick={handleStake} className={styles.confirmButton}>Confirm</button>
        </div>
        
      </div>
    </div>
  );
}

export default StakePopup;
