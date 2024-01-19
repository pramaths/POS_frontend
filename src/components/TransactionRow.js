// TransactionRow.js
import React, { useState } from 'react';
import moment from 'moment';
import Link from 'next/link';
const TransactionRow = ({ transaction }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <tr onClick={toggleOpen}>
                <td><span className="toggle-arrow">{isOpen ? '▼' : '►'}</span> 0x{transaction.txHash?.slice(0, 8)}....</td>
                <td>{transaction.method || "Transfer"}</td>
                <td>0x{transaction.blockHash?.slice(0, 5)}</td>
                <td>{moment(transaction.createdAt).fromNow()}</td>
                <td>{transaction.sender?.slice(0, 10)}...</td>
                <td>{transaction.recipient?.slice(0, 10)}...</td>
                <td>{transaction.amount} ETH</td>
                <td>{transaction.gasPrice} Gwei</td>
            </tr>
            {isOpen && (
                <tr>
                    <td colSpan="8">
                        <div><Link to='https://ethereum.org/en/developers/docs'>More information about ETH</Link></div>
                    </td>
                </tr>
            )}
        </>
    );
};

export default TransactionRow;
