'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AccountDetails = () => {
    const [transactions, setTransactions] = useState([]);
    const [accountDetails, setAccountDetails] = useState([]);
    const [walletaddress, setWalletAddress] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (router.isReady) {
            const { walletaddress: walletaddressParam } = router.query;

            if (walletaddressParam) {
                fetch(`http://localhost:8000/api/get/address/${walletaddressParam}`)
                    .then(response => response.json())
                    .then(data => {
                        setTransactions(data.transactions);
                        setAccountDetails(data.account);
                        setWalletAddress(walletaddressParam);
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
            }
        }
    }, [router.isReady, router.query]);

    return (
        <div>
            <div>
            <h1>Account Details</h1>
            <p>Address: {walletaddress}</p>
            </div>

            <div>
                
            </div>
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
