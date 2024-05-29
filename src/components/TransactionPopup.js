import React, { useState ,useRef } from 'react';
import '../styles/TransactionPopup.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookie from 'js-cookie';
  const TransactionPopup = ({ onClose }) => {
    const popupContentRef = useRef(null);
    
    const [address, setAddress] = useState('');
    const [gasPrice, setGasPrice] = useState('');
    const [amount, setAmount] = useState('');
    const [data, setData] = useState('');
    const walletAddress=Cookie.get("walletaddress")

    const defaultData = '0x0';
    const defaultGasPrice = '1';
    const handleContainerClick = (event) => {
      if (!popupContentRef.current.contains(event.target)) {
        onClose();
      }
    };
    const handleSubmit = async () => {
      onClose();
      const response = await fetch('https://pos-backend-plyp.onrender.com/api/create-transaction', {
        method: 'POST',
        credentials:'include',
        headers: {
          'Content-Type': 'application/json',
          'x-wallet-address': walletAddress
            },
        body: JSON.stringify({
          to : address,
          gasPrice: gasPrice || `${defaultGasPrice}`, 
          amount : amount,
          data: data || `${defaultData}`,
          gasLimit : 1,
          blockHash : "your_block_hash"
        }),
      });
      const responseData = await response.json();
      if(response.status === 200) toast.success('Transaction created successfully');
      console.log(responseData);
   
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
            {/* <br /> */}
            <label>Gas Price:</label>
            <input type="text" placeholder="Enter Gas Price" className="inputField" onChange={(e)=>{setGasPrice(e.target.value)}} />
            {/* <br /> */}
            <label>Amount:</label>
            <input type="text" placeholder="Enter Amount" className="inputField" onChange={(e)=>{setAmount(e.target.value)}} />
            {/* <br /> */}
            <label>Data:</label>
            <input type="text" placeholder="Enter Data" className="inputField" onChange={(e)=>{setData(e.target.value)}} />
            <br />
            <button className="submitButton" onClick={handleSubmit}>Submit Transaction</button>
            <br />
          </div>
        </div>
      </div>
    );
  
    
  };
export default TransactionPopup;
