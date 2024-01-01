'use client'

import React, { useEffect, useState } from 'react';
import Header from "../../components/Header"
import moment from 'moment';
import "./tx.css"
const TransactionsPage = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch("https://proof-of-stake.onrender.com/api/transactions");
                const data = await response.json();
                setTransactions(data.transactions.reverse());
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
    }, []);
console.log(transactions)
    return (
        <div>

            <Header/>
            <div className='transactions'>
            <div className='transaction-header'>Transaction Details</div >
            <div className='tr-br'>
            <table className='transactions-table'>
            <thead>
                <tr>
                    <th>Txn Hash</th>
                    <th>Method</th>
                    <th>Block</th>
                    <th>Age</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Value</th>
                    <th>Txn Fee</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                        <td>0x{transaction.txHash.slice(0,8)}....</td>
                        <td>{transaction.method}</td>
                        <td>0x{transaction.blockHash.slice(0,5)}</td>
                        <td>{moment(transaction.createdAt).fromNow()}</td>
                        <td>{transaction.sender.slice(0,10)}...</td>
                        <td>{transaction.recipient.slice(0,10)}...</td>
                        <td>{transaction.amount}{" "}ETH</td>
                        <td>{transaction.gasPrice}Gwei</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
        </div>
        </div>
        

    );
};

export default TransactionsPage;
