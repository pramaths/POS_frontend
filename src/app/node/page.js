'use client'

import React, { useState, useEffect, useRef } from 'react';
import Header from '../../components/Header';
import io from 'socket.io-client';
import styles from '../../styles/node.module.css';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const serverUrl = 'http://localhost:8000';

const loggedInUserAddress = Cookies.get('walletaddress');

const Node = () => {
  const [blocks, setBlocks] = useState([]);
  const [nodeData, setNodeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [validatorselected, setvalidatorselected] = useState("")
  const latestBlockRef = useRef(null);
  const [mempoolTransactions, setmempoolTransactions] = useState([])

  useEffect(() => {
    if (latestBlockRef.current) {
      latestBlockRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [blocks]);

  useEffect(() => {
    fetch('http://localhost:8000/api/get/validator', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => {
        if (response.status === 404) {
          return { message: "You don't have an address" };
        } else if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Failed to fetch validator data');
        }
      })
      .then((data) => {
        setNodeData(data);
        setIsLoading(false);

        if (!data.message) {
          setBlocks(data[0].BlockchainState.chain[0].chain);
          // console.log(data[0].BlockchainState.chain);
        }
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        setIsLoading(false);
      });

    // Function to display the toast
    const displayToast = (nonce) => {
      toast.success(`Block mined with nonce : ${nonce}`, {
        position: 'top-right',
        autoClose: 4000, // 4 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    };


    const socket = io(serverUrl);

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('blocksUpdated', (updatedBlocks) => {
      setBlocks(updatedBlocks);
    });

    socket.on('blockMined', (minedBlockData) => {
      setmempoolTransactions([]); // considering all mempool transactions are taken into block...
      displayToast(minedBlockData.nonce);
    });

    socket.on('validatorSelected', (validatorData) => {
      setvalidatorselected(validatorData)
    })

    socket.on('pendingTransactionsUpdate', (data) => {

      console.log(data.pendingTransactions);

      setmempoolTransactions(data.pendingTransactions);

      // console.log(data.address , loggedInUserAddress);
      console.log(mempoolTransactions);
    });

    return () => {
      socket.disconnect();
    };

  }, []);


  const [cookieAddress, setCookieAddress] = useState('');

  useEffect(() => {
    const addressFromCookie = document.cookie.replace(
      /(?:(?:^|.*;\s*)walletaddress\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    setCookieAddress(addressFromCookie);
  }, []);

  return (
    <div>
      <section className={styles.main}>
        <Header />

      </section>
      <div className={styles.blockchainstatecontainer}>
        {isLoading ? (
          <p>Loading...</p>
        ) : nodeData?.message ? (
          <div className={styles.blueBox}>
            <h3>You are a User</h3>
            <p>{nodeData.message}</p>
          </div>
        ) : (
          <div className={styles.blueBox}>
            {/* React-toastify container */}
            <ToastContainer />
            <h3>You are a Validator (Node)</h3>
            <h4>Blockchain State of Node :      {loggedInUserAddress}
            </h4>
            <div className={styles.horizontalBlockchainList}>
              {Array.isArray(blocks) &&
                blocks.map((block, index) => (
                  <React.Fragment key={block._id}>
                    <div
                      ref={index === blocks.length - 1 ? latestBlockRef : null}
                      className={`${styles.block} ${block.validator === cookieAddress ? styles.shiningBorder : ''}`}
                    >
                      <p>Block Index: {block.index}</p>
                      <p>Validator: {block.validator?.address}</p>
                    </div>
                    {index !== blocks.length - 1 && (
                      <img className={styles.chainImage} src="/chain.svg" alt="Chain" />
                    )}
                  </React.Fragment>
                )
                )}

            </div>
          </div>
        )}
      </div>
      <div className={styles.backendcontainer}>
        <div className={styles.validatorselected}>Validator Selected : {validatorselected.validatorAddress}</div>

        <div className={styles.backendBox}>
          {/* This part can include any other content you have on the left side */}

          <div className={styles.mempoolTableContainer}>
            <table className={styles.mempoolTable}>
              <thead>
                <tr>
                  <th>Memory Pool - Transaction ID</th>
                  {/* <th>Amount</th>
                  <th>From</th>
                  <th>To</th> */}
                  {/* Add other headers if needed */}
                </tr>
              </thead>
              <tbody>
                {/* Assuming you have a mempoolTransactions array */}
                {mempoolTransactions.map(tx => (
                  <tr key={tx.id} >
                    <td>{tx}</td>
                    {/* <td>{tx.gas_price}</td> */}
                    {/* <td>{tx.from}</td>
                    <td>{tx.to}</td> */}
                    {/* Add other cells if needed */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Node;