'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { useRouter } from 'next/navigation';
import moment from "moment";
import './style.css';
import Header from "@/components/Header";

function Block({ params }) {
    const router = useRouter();
    const blockNo = params.blocknumber;
    const [info, setInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedTransaction, setExpandedTransaction] = useState(null);

    useEffect(() => {
        async function fetchBlockData() {
            try {
                const response = await fetch(`https://proof-of-stake.onrender.com/api/get/block/${blockNo}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setInfo(data.block);
            } catch (error) {
                console.error("Error fetching block data:", error);
                setInfo(null);
            } finally {
                setLoading(false);
            }
        }
        fetchBlockData();
    }, [blockNo]); 

    const toggleTransaction = (index) => {
        setExpandedTransaction(expandedTransaction === index ? null : index);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!info) {
        return <div>Block not found</div>;
    }
console.log("info",info)
    return (
        <div>
            <Header />
            <section className="block-container">
                <h1 className="block-title">
                    Block <span className="block-number">#{info?.index}</span>
                </h1>
                <div className="overview-container">
                    <h2 className="overview-title">Overview</h2>
                    <div className="info-row">
                        <TitleComponent title="Block" />
                        <p className="info-content">{info?.nonce}</p>
                    </div>
                    <div className="info-row">
                        <TitleComponent title="Hash" />
                        <p className="info-content">0x{info?.hash}</p>
                    </div>
                    <div className="info-row">
                        <TitleComponent title="Prevhash" />
                        <p className="info-content">0x{info?.prevHash}</p>
                    </div>
                    <div className="info-row">
                        <TitleComponent title="Validator" />
                        <p className="info-content">0x{info?.validator?.address}</p>
                    </div>
                    <div className="info-row">
                        <TitleComponent title="Time Stamp" />
                        <p className="info-content">{moment(info?.createdDate).fromNow()}</p>
                    </div>
                    <div className="info-row">
                        <TitleComponent title="Transactions" />
                        <div>
    {info.transactions && info.transactions.map((transaction, index) => (
        <div key={index} style={{color:"blueviolet"}}>
            <Link href={`/Transactions?hash=${transaction.txHash}`}>
                {transaction.txHash}
            </Link>            
        </div>
    ))}
</div>
                    </div>
                    <div className="info-row">
                        <TitleComponent title="" />
                        <p className="info-content">0x{info?.validator?.address}</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

function TitleComponent({ title }) {
    return (
        <div className="title-component">
            <AiOutlineQuestionCircle />
            <p className="title">{title}</p>
        </div>
    );
}

export default Block;
