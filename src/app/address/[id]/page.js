'use client'
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 

const AccountDetails = ({params}) => {
    const [transactions, setTransactions] = useState([]);
    const [AccountDetails,setaccountDetails]=useState([]);
    const [walletAddress , setWalletAddress] = useState(''); 

    useEffect(()=>{
        if(params.id){
            setWalletAddress(params.id)
        }
    },[params.id])

    useEffect(() => {
        if (walletAddress) {
            fetch(`http://localhost:8000/api/get/address/${walletAddress}`) 
                .then((response) => response.json())
                .then((data) => {
                    setTransactions(data.transactions);
                    setaccountDetails(data.account)
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [params.id]); 

    return (
        <div>
            <h1>Account Details</h1>
            <p>Address: {walletAddress}</p> 
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
