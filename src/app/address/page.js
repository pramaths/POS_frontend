'use client'
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 

const AccountDetails = () => {
    const [transactions, setTransactions] = useState([]);
    const [AccountDetails,setaccountDetails]=useState([]);s
    const { walletaddress } = useParams(); 

    useEffect(() => {
        if (walletaddress) {
            fetch(`http://localhost:8000/api/get/address/${walletaddress}`) 
                .then((response) => response.json())
                .then((data) => {
                    setTransactions(data.transactions);
                    setaccountDetails(data.account)
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [address]); 

    return (
        <div>
            <h1>Account Details</h1>
            <p>Address: {walletaddress}</p> 
            <table>
                <thead>
                    <tr>
                        <th>Transaction Hash</th>
                        <th>From</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index) => (
                        <tr key={index}>
                            <td>{transaction.txhash}</td>
                            <td>{transaction.from}</td>
                            <td>{transaction.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AccountDetails;
