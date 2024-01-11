'use client'
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
// import "./accountdetails.css";
import moment from 'moment';
const AccountDetails = ({params}) => {
    const [transactions, setTransactions] = useState([]);
    const [accountDetails, setAccountDetails] = useState({
      balance: 0,
      stakedEth: 0,
      createdAt: ''
    });
    const [walletAddress, setWalletAddress] = useState('');

    useEffect(() => {
        if (params.id) {
            setWalletAddress(params.id);
        }
    }, [params.id]);

    useEffect(() => {
        if (walletAddress) {
            fetch("https://proof-of-stake.onrender.com/api/get/address/0x4fb3d621b81bd651f6c922c0ee075459e2518512") 
                .then(response => response.json())
                .then(data => {
                    setTransactions(data.transactions);
                    setAccountDetails(data.account);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [walletAddress]);
console.log("gygyg",transactions)
console.log("kkkkkkkk",accountDetails)
    return (
        <div>
            <Header />
            <div className='accountlayout'>
            <h4>Address: {walletAddress}</h4> 
                <div className='accountdetails'>
                    <div className='acc'>
                        <div className='accdet'>
                            <h3>Overview</h3>
                            <div className='details-design'>
                            <div>ETH balance</div>
                            <div>{accountDetails.balance}</div>
                            </div>
                            <div className='details-design'>
                            <div>Staked ETH</div>
                            <div>{accountDetails.stakedEth}</div>
                            </div>
                            <div className='details-design'>
                            <div>Created At</div>
                            <div>{accountDetails.createdAt}</div>
                            </div>
                        </div>
                    </div>
                    <div className='acc'>
                        <div className='accdet'>
                            <h3>More Info</h3>
                            {transactions.length > 0 && (
            <>
                <div className='details-design'>
                    <div>Last Tx sent</div>
                    <div>{moment(transactions[0]?.createdAt).fromNow()}</div>
                </div>
                <div className='details-design'>
                    <div>First tx sent</div>
                    <div>{moment(transactions[transactions.length - 1]?.createdAt).fromNow()}</div>
                </div>
                <div className='details-design'>
                    <div>Total Tx</div>
                    <div>{transactions.length}</div>
                </div>
            </>
        )}
                        </div>
                    </div>
                    <div className='acc'>
                        <div className='accdet'>
                        <h3>More Info</h3>
                        {transactions.length > 0 && (
            <>
                <div className='details-design'>
                    <div>Last Tx sent</div>
                    <div>{moment(transactions[0]?.createdAt).fromNow()}</div>
                </div>
                <div className='details-design'>
                    <div>First tx sent</div>
                    <div>{moment(transactions[transactions.length - 1]?.createdAt).fromNow()}</div>
                </div>
                <div className='details-design'>
                    <div>Total Tx</div>
                    <div>{transactions.length}</div>
                </div>
            </>
        )}
                        </div>
                    </div>
                </div>
            </div>
            <div className='acc-table'>
            <table className="account-details-table">
            <thead>
                <tr>
                    <th>Transaction Hash</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Method</th>
                    <th>Value</th>
                    <th>Timestamp</th>
                    <th>Txn Fee</th>
                </tr>
            </thead>
            <tbody>
  {transactions.map((transaction, index) => (
    <tr key={index}>
      <td>0x{transaction.txHash?.slice(0,20)}...</td>
      <td>{transaction.sender?.slice(0,15)}...</td>
      <td>{transaction.recipient?.slice(0,15)}...</td>
      <td>{transaction.method}</td>
      <td>{transaction.amount} ETH</td>
      <td>{moment(transaction.createdAt).fromNow()}</td>
      <td className={transaction.status === 'mined' ? 'mined-status' : ''}>
        {transaction.status === 'mined' ? 'Mined' : transaction.status}
      </td>
    </tr>
  ))}
</tbody>

        </table>
        </div>
        </div>
    );
};

export default AccountDetails;
