import React, { useState ,useRef } from 'react';
import styles from '../styles/Home.module.css';


  const TransactionPopup = ({ onClose }) => {
    const popupContentRef = useRef(null);
    
    const [address, setAddress] = useState('');
    const [gasPrice, setGasPrice] = useState('');
    const [amount, setAmount] = useState('');
    const [data, setData] = useState('');

    const defaultData = '0x0';
    const defaultGasPrice = '1';
  
    const handleContainerClick = (event) => {
      if (!popupContentRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleSubmit = async () => {
      const response = await fetch('http://localhost:8000/api/create-transaction', {
        method: 'POST',
        credentials:'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to : address,
          gasPrice: gasPrice || `${defaultGasPrice}`, // Replace 'defaultGasPrice' with an actual default value if necessary
          amount : amount,
          data: data || `${defaultData}`, // Replace 'defaultData' with an actual default value if necessary
          gasLimit : 1,
          blockHash : "your_block_hash"
        }),
      });
  
      const responseData = await response.json();
      console.log(responseData);
  
      // Handle the response or perform further actions if needed.
    };

    return (
      <div className={styles.popupcontainer} onClick={handleContainerClick}>
        <div className={styles.popupcontent} ref={popupContentRef}>
          <button onClick={onClose} className={styles.closeButton}>
            X
          </button>
          <div>
            <label>Address:</label>
            <input type="text" placeholder="Enter Address" className={styles.inputField} onChange={(e)=>{setAddress(e.target.value)}} />
            <label>Gas Price:</label>
            <input type="text" placeholder="Enter Gas Price" className={styles.inputField} onChange={(e)=>{setGasPrice(e.target.value)}} />
            <label>Amount:</label>
            <input type="text" placeholder="Enter Amount" className={styles.inputField} onChange={(e)=>{setAmount(e.target.value)}} />
            <label>Data:</label>
            <input type="text" placeholder="Enter Data" className={styles.inputField} onChange={(e)=>{setData(e.target.value)}} />
            <button className={styles.submitButton} onClick={handleSubmit}>Submit Transaction</button>
          </div>
        </div>
      </div>
    );
  
    
  };
export default TransactionPopup;
