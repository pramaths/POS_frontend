import React, { useState, useRef } from "react";
import styles from "../styles/StakePopup.module.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookie from "js-cookie";
function StakePopup({ onClose }) {
  const [amount, setAmount] = useState("");
  const contentRef = useRef(null);
  const walletAddress=Cookie.get('walletaddress')
  const pubkey=Cookie.get("publicKey")
  console.log("heirhh",pubkey)
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
    const response = await fetch('https://proof-of-stake.onrender.com/api/account/stake', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'x-wallet-address':walletAddress,
        'x-publicKey':pubkey
      },
      body: JSON.stringify({amount}),
    });

    if (response.status === 200) {
      console.log('Staked succesfully.');
      toast.success('Staked succesfully.');
    } else {
      console.error('Error Staking');
      toast.error('Error in Staking');
    }

    console.log("Staking amount:", amount);
    onClose();
  };

  const handleOverlayClick = (event) => {
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
