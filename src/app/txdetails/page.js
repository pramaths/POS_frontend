'use client'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const TransactionDetailsPage = () => {
    const router = useRouter();
    const { eot } = router.query;
    const [transaction, setTransaction] = useState(null);

    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                const response = await fetch(`/api/transactions?eot=${eot}`);
                const data = await response.json();
                setTransaction(data);
            } catch (error) {
                console.error('Error fetching transaction:', error);
            }
        };

        if (eot) {
            fetchTransaction();
        }
    }, [eot]);

    if (!transaction) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Transaction Details</h1>
            <p>Transaction Hash: {transaction.hash}</p>
            <p>Status: {transaction.status}</p>
            <p>From: {transaction.from}</p>
            <p>To: {transaction.to}</p>
            <p>Amount: {transaction.amount}</p>
        </div>
    );
};

export default TransactionDetailsPage;
