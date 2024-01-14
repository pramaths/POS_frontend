import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import styles from "../styles/Home.module.css";
import Cookie from 'js-cookie';
const Logo = "/assets/blockrolllogo.png";
import StakePopup from './Stakepopup';
import TransactionPopup from './TransactionPopup';
import { useHistory } from 'react-router-dom';
import { IoIosArrowDown } from "react-icons/io";
import { MdContentCopy } from "react-icons/md";
import copy from 'clipboard-copy';
import { Reem_Kufi } from "next/font/google";

export default function Header() {
  const [ethPrice, setEthPrice] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [accountData, setAccountData] = useState(null);
  const [showStakePopup, setShowStakePopup] = useState(false);
  const [showTransactionPopup, setShowTransactionPopup] = useState(false);
  const walletPopupRef = useRef(null);

  

  const handleCopyPublic = () => {
    if (accountData.publicKey) {
      copy(accountData.publicKey);
      alert('publicKey copied to clipboard!');
    }
  };

  const handleCopyPrivate = () => {
    if (accountData.privateKey) {
      copy(accountData.privateKey);
      alert('privateKey copied to clipboard!');
    }
  };

  const handleCopyAddress = () => {
    if (accountData.address) {
      copy(accountData.address);
      alert('Wallet Address copied to clipboard!');
    }
  };

  // console.log(accountData?.publicKey.length,accountData?.privateKey.length,accountData?.address.length)
  // publicKey = 130
  // privateKey = 66
  // address = 42

  // Dropdown states and stuff
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  }

  // Dropdown states stuff over

  const router = useRouter();

  const handleStakeClick = () => {
    if(!Cookie.get("walletaddress")){
      alert("Please create an account first");
      return;
    }
    setShowStakePopup(true);
  };
  const handleOutsideClick = (event) => {
    if (walletPopupRef.current && !walletPopupRef.current.contains(event.target)) {
      setShowPopup(false);
    }
  };
  const navigateToBlockchainPage = () => {
    router.push('/blockchain'); // navigating to the blockchain page
  };

  const navigateToTransactionsPage = () => {
    router.push('/Transactions'); // navigating to the transactions page
  };

  const navigateToHomePage = () => {
    router.push('/');
  };

  const navigateToNodePage = () => {
    router.push('/node'); // navigating to the node page
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const createdAddress = Cookie.get("walletaddress");
    const publicKey = Cookie.get("publicKey")
    console.log("pubkey", publicKey)
    console.log("cookieaddress", createdAddress)
    if (createdAddress) {
      fetchAccountData();
    }
  }, []);

  const togglePopup = () => {
    if(!Cookie.get("walletaddress")){
      alert("Please create an account first");
      return;
    }
    setShowPopup(!showPopup);
  };

  const fetchAccountData = async () => {
    try {
      const response = await axios.get("https://proof-of-stake.onrender.com/api/get/account", { withCredentials: true });
      console.log("hduehfuehfh",response.data)
      setAccountData(response.data);
    } catch (error) {
      console.error("Error fetching wallet data:", error);
    }
  };

  const handleCreateAccount = async () => {
    try {

      const response = await axios.post("https://proof-of-stake.onrender.com/api/wallet/generatekeys", { withCredentials: true  });
      // console.log("hellohhhhh",response.data)
      // Cookie.set("walletaddress", response.data.address)
      // Cookie.set("publicKey", response.data.publicKey)
      setAccountData(response.data);
      togglePopup();
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  useEffect(() => {
    const getEthPrice = async () => {
      const response = await axios.get("https://api.etherscan.io/api?module=stats&action=ethprice&apikey=HVHTPWF3UJ8P5ZEDNUZYMT28ZZNEEURRD4", {});
      setEthPrice(response.data.result.ethusd);
    };
    getEthPrice();
  }, []);

  return (
    <section className={styles.header}>
      <section className={styles.topHeader}>
        ETH Price:{" "}
        <span className={styles.blueText}>${Number(ethPrice).toFixed(2)}</span>
      </section>
      <section className={styles.navbar}>
        {/* <Image src="/svg/logo-white.svg" alt="Etherscan Logo" className={styles.logo} width={10} height={5} />
         */}
        Block & Roll
        <section className={styles.menu}>
          <p onClick={navigateToHomePage}>Home</p>
          {/* <p onClick={navigateToBlockchainPage}>
  Blockchain
</p> */}
          <div className={styles.dropdown} onBlur={closeDropdown} tabIndex="0">
            <div className={styles.dropdownBtn} onClick={toggleDropdown}>Blockchain <span className={styles.icon}><IoIosArrowDown  /></span></div>
            {isOpen && (
              <div className={styles.dropdownContent}>
                <a onClick={navigateToBlockchainPage}>Blockchain</a>
                <a onClick={navigateToTransactionsPage}>Transactions</a>
              </div>
            )}

          </div>

          <p onClick={navigateToNodePage}>
            Node
          </p>

          <p onClick={() => setShowTransactionPopup(true)}>
            Start Transaction
          </p>
          <p onClick={handleStakeClick}>
            Stake ETH
          </p>

          <p onClick={togglePopup}>
            Wallet
          </p>
          <p>|</p>
          {accountData ? (
            <p className={styles.signIn} onClick={togglePopup}>
              {accountData.address?.slice(0, 8)}...{accountData.address?.slice(36, 42)}
            </p>
          ) : (
            <p className={styles.signIn} onClick={handleCreateAccount}>
              Create Account
            </p>
          )}
        </section>
      </section>
      {showPopup && (
        <div className={styles.popupcontainer} onClick={handleOutsideClick}>
          <div className={styles.popupcontent} ref={walletPopupRef}>
            {accountData ? (
              <div>
                <button onClick={togglePopup} className={styles.closeButton}>
                  X
                </button>
                <p><span className={styles.spanHeaders}>Public Key&nbsp;&nbsp;&nbsp;&nbsp;: </span>{accountData.publicKey?.slice(0, 8)}...{accountData.publicKey?.slice(122, 130)} <span className={styles.copyIcon} onClick={handleCopyPublic}><MdContentCopy /></span></p>
                <br/>
                <p><span className={styles.spanHeaders}>Private Key&nbsp;&nbsp;: </span>{accountData.privateKey?.slice(0, 8)}...{accountData.privateKey?.slice(58, 66)} <span className={styles.copyIcon} onClick={handleCopyPrivate}><MdContentCopy /></span></p>
                <br/>
                <p><span className={styles.spanHeaders}>Address&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </span>{accountData.address?.slice(0, 8)}...{accountData.address?.slice(34, 42)} <span className={styles.copyIcon} onClick={handleCopyAddress}><MdContentCopy /></span></p>
                <br/>
                <p><span className={styles.spanHeaders}>Balance&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </span>{accountData.balance} ETH</p>
                <br/>
                <p><span className={styles.spanHeaders}>StakedETH&nbsp;&nbsp;: </span>{accountData.stakedEth == 0 ? 0 : accountData.stakedEth } ETH</p>
                {/* <button>Stake</button>
                <button>Transactions</button> */}
              </div>
            ) : (
              <div>
                <p>Public Key: {accountData.publicKey}</p>
                <p>Address: {accountData.address}</p>
                <p>Balance: {accountData.balance} ETH</p>
              </div>
            )}
          </div>
        </div>
      )}
      {showStakePopup && <StakePopup onClose={() => setShowStakePopup(false)} />}
      {showTransactionPopup && <TransactionPopup onClose={() => setShowTransactionPopup(false)} />}

    </section>
  );
}