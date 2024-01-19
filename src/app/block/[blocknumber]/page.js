"use client"
import React,{useState,useEffect} from "react";
import Link from "next/link";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { useRouter } from 'next/navigation';
import moment from "moment";
import './style.css';
import Header from "@/components/Header";
function Block({params}) {
    const router=useRouter()
    const  blockNo = params.blocknumber;
    const [info, setInfo] = useState(null); // Store block data in state
    const [loading, setLoading] = useState(true); // Track if data is loading
    console.log('useParams:', params.blocknumber);    
    useEffect(() => {
        async function fetchBlockData() {
            try {
                const response = await fetch(`https://proof-of-stake.onrender.com/api/get/block/${blockNo}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setInfo(data.block); // Set block data
            } catch (error) {
                console.error("Error fetching block data:", error);
                setInfo(null); // If error, set block data to null
            } finally {
                setLoading(false); // Set loading to false after data is fetched
            }
        }
        fetchBlockData();
    }, [router.isReady,router.query,blockNo]); 
    console.log(info)

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!info) {
        return <div>Block not found</div>;
    }
    return (
        <div><Header/>
        <section className="block-container">
        <h1 className="block-title">
            Block <span className="block-number">#{info?.index}</span>
        </h1>
        <div className="overview-container">
            <h1 className="overview-title">Overview</h1>
            <div className="flex-container">
                <div className="half-width divider">
                        <TitleComponent title="Block" />
                        <TitleComponent title="Time Stamp" />
                        <TitleComponent title="Transactions" />
                        <TitleComponent title="Fee Recipient" />
                        <TitleComponent title="Gas Used" />
                        <TitleComponent title="Gas Limit" />                     
                        <TitleComponent title="Extra Data" />
                        <TitleComponent title="Hash" />
                        <TitleComponent title="Previos Hash" />
                        <TitleComponent title="Difficulty" />
                    </div>
                    <div  className="half-width divider">
                        <p className="py-3">{info?.nonce}</p>
                        <p className="py-3">{moment(info?.createdDate).fromNow()}</p>
                        <p className="py-3 text-[#357BAD]">
                        {info.index && (
                    <p className="py-3 text-[#357BAD]">
                        <Link href={`/txs?block=${info.index}`}>
                            {info.transactions ? `${info.transactions.length} transactions` : '0 transactions'}
                        </Link>
                    </p>
                )}
                        </p>
                        <p className="py-3 text-[#357BAD]">
                        {info.validator && (
                    <p className="py-3 text-[#357BAD]">
                        <Link href={`/address/${info?.validator}`}>
                            {info.miner}
                        </Link>
                    </p>
                )}
                        </p>
                        <p className="py-3"></p>
                        <p className="py-3"> Gwei</p>
                        <p className="py-3">300000 wei</p>
                        <p className="py-3">{info?.hash}</p>
                        <p className="py-3 text-[#357BAD]">
                        </p>
                    </div>
                </div>
            </div>
        </section>
        </div>
    );
}

function TitleComponent({ title }) {
    return (
        <div className="flex-container items-center">
        <AiOutlineQuestionCircle />
        <p className="ml-2 py-3">{title}</p>
    </div>
    );
}

export default Block;