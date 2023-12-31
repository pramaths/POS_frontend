import React, { useState ,useRef } from 'react';
import '../styles/TransactionPopup.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

    // // Function to display the toast
    // const displayToast = (nonce) => {
    //   toast.success(`Created transaction Successfully`, {
    //     position: 'top-right',
    //     autoClose: 4000, // 4 seconds
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //   });
    // };

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
      if(response.status === 200) toast.success('Transaction created successfully');
      console.log(responseData);
  
      // Handle the response or perform further actions if needed.

      onClose();
    };

    return (
      <div className="popupcontainer" onClick={handleContainerClick}>
        <div className="popupcontent" ref={popupContentRef}>
          <button onClick={onClose} className="closeButton">
            X
          </button>
          <div>
            <br />
            <label>Address:</label>
            <input type="text" placeholder="Enter Address" className="inputField" onChange={(e)=>{setAddress(e.target.value)}} />
            <br />
            <label>Gas Price:</label>
            <input type="text" placeholder="Enter Gas Price" className="inputField" onChange={(e)=>{setGasPrice(e.target.value)}} />
            <br />
            <label>Amount:</label>
            <input type="text" placeholder="Enter Amount" className="inputField" onChange={(e)=>{setAmount(e.target.value)}} />
            <br />
            <label>Data:</label>
            <input type="text" placeholder="Enter Data" className="inputField" onChange={(e)=>{setData(e.target.value)}} />
            <br /><br />
            <button className="submitButton" onClick={handleSubmit}>Submit Transaction</button>
            <br />
          </div>
        </div>
      </div>
    );
  
    
  };
export default TransactionPopup;
