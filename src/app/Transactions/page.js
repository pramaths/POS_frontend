// 'use client'

// import React, { useEffect, useState } from 'react';
// import Header from "../../components/Header"
// import moment from 'moment';
// import "./tx.css"
// const TransactionsPage = () => {
//     const [transactions, setTransactions] = useState([]);

//     useEffect(() => {
//         const fetchTransactions = async () => {
//             try {
//                 const response = await fetch("https://pos-backend-plyp.onrender.com/api/transactions");
//                 const data = await response.json();
//                 setTransactions(data.transactions.reverse());
//             } catch (error) {
//                 console.error('Error fetching transactions:', error);
//             }
//         };

//         fetchTransactions();
//     }, []);
// console.log(transactions)
// const toggleDetails = (id) => {
//     setTransactions(transactions.map(transaction => 
//         transaction.id === id ? { ...transaction, showDetails: !transaction.showDetails } : transaction
//     ));
// };
//     return (
//         <div>

//             <Header/>
//             <div className='transactions'>
//             <div className='transaction-header'>Transaction Details</div >
//             <div className='tr-br'>
//             <table className='transactions-table'>
//             <thead>
//                 <tr>
//                     <th>Txn Hash</th>
//                     <th>Method</th>
//                     <th>Block</th>
//                     <th>Age</th>
//                     <th>From</th>
//                     <th>To</th>
//                     <th>Value</th>
//                     <th>Txn Fee</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {transactions.map((transaction) => (
//                     <tr key={transaction.id}>
//                         <td>0x{transaction.txHash?.slice(0,8)}....</td>
//                         <td>
//                         <td style={{ border: '1px solid black',backgroundColor: '#505050' ,borderRadius:"7px"}}>
//     {transaction.method || "Transfer"}
// </td>

//                             </td>
//                         <td>0x{transaction.blockHash?.slice(0,5)}</td>
//                         <td>{moment(transaction.createdAt).fromNow()}</td>
//                         <td>{transaction.sender?.slice(0,10)}...</td>
//                         <td>{transaction.recipient?.slice(0,10)}...</td>
//                         <td>{transaction.amount}{" "}ETH</td>
//                         <td>{transaction.gasPrice}Gwei</td>
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//         </div>
//         </div>
//         </div>
        

//     );
// };

// export default TransactionsPage;
'use client'
import React, { useEffect, useState,useRef } from 'react';
import Header from "../../components/Header";
import moment from 'moment';
import "./tx.css";
import { usePathname, useSearchParams } from 'next/navigation'
const TransactionsPage = () => {
    const [transactions, setTransactions] = useState([]);
    const [expandedIndex, setExpandedIndex] = useState(null); // Use index for tracking expanded row
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const transactionRefs = useRef([]);
//     useEffect(() => {
//       const url = `${pathname}?${searchParams}`
//       console.log("URL",url)
//     }, [pathname, searchParams])
//     useEffect(() => {
//         const fetchTransactions = async () => {
//             try {
//                 const response = await fetch("https://pos-backend-plyp.onrender.com/api/transactions");
//                 const data = await response.json();
//                 setTransactions(data.transactions.reverse());
//                 const hashParam = new URLSearchParams(searchParams).get('hash');
// console.log("hashprama",hashParam)
//                 const foundIndex = transactions.findIndex(trx => trx.txHash === hashParam);
// console.log("foundindex",foundIndex)
//                 if (foundIndex !== -1) {
//                     setExpandedIndex(foundIndex);
//                 }
//             } catch (error) {
//                 console.error('Error fetching transactions:', error);
//             }
           
//         };

//         fetchTransactions();
//     }, []);
useEffect(() => {
    const fetchTransactions = async () => {
        try {
            const response = await fetch("https://pos-backend-plyp.onrender.com/api/transactions");
            const data = await response.json();
            const transactionsReversed = data.transactions.reverse();
            const hashParam = new URLSearchParams(searchParams).get('hash');
            console.log("hashParam", hashParam);
            const foundIndex = transactionsReversed.findIndex(trx => trx.txHash === hashParam);
            console.log("foundIndex", foundIndex);
            if (foundIndex !== -1) {
                setExpandedIndex(foundIndex);
                setTimeout(() => {
                    transactionRefs.current[foundIndex]?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });
                }, 0);
            }

            setTransactions(transactionsReversed);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    fetchTransactions();
}, [searchParams]); // Make sure to add searchParams as a dependency

    const toggleDetails = (index) => {
        // Toggle the expansion for the clicked transaction using index
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div>
            <Header />
            <div className='transactions'>
                <div className='transaction-header'>Transaction Details</div>
                <div className='tr-br'>
                    <table className='transactions-table'>
                        <thead>
                            <tr>
                                <th></th> {/* For the toggle button */}
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
                            {transactions.map((transaction, index) => (
                                <React.Fragment key={transaction.id}>
                                    <tr ref={el => transactionRefs.current[index] = el}>
                                        <td>
                                            <button onClick={() => toggleDetails(index)} style={{ cursor: 'pointer' }}>
                                                {expandedIndex === index ? '▲' : '▼'}
                                            </button>
                                        </td>
                                      
                                        <td>0x{transaction.txHash?.slice(0,8)}...</td>
                                        <td>{transaction.method || "Transfer"}</td>
                                        <td>0x{transaction.blockHash?.slice(0,5)}</td>
                                        <td>{moment(transaction.createdAt).fromNow()}</td>
                                        <td>{transaction.sender?.slice(0,10)}...</td>
                                        <td>{transaction.recipient?.slice(0,10)}...</td>
                                        <td>{transaction.amount} ETH</td>
                                        <td>{transaction.gasPrice} Gwei</td>
                                    </tr>
                                    {expandedIndex === index && (
                                        <tr>
                                            <td colSpan="9">
                                                <div className='transaction-details'>
                                                 <div>
                                                 <p>Nonce: {transaction.nonce}</p>
                                                 </div>
                                                 <div>
Sender: {transaction.sender}
</div>
<div>
Recipient: {transaction.recipient}
</div>
                                                   <div>
                                                   <p>Gas Limit: {transaction.gasLimit}</p>


                                                   </div>
<div>

<p>Data: {transaction.data}</p>

</div>
                                                    <p>Tx Hash:0x{transaction.txHash}</p>
                                                    <div>
                                                        Method: Transfer
                                                    </div>
                                                    <div>
                                                   Created At: {moment(transaction.createdAt).fromNow()}
                                                    </div>

                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TransactionsPage;
