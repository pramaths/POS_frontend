import React,{ useEffect, useState,useRef  } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from 'next/navigation';import styles from "../styles/Home.module.css";
import Cookie from 'js-cookie';
const Logo = "/assets/blockrolllogo.png";
import StakePopup from './Stakepopup';
import TransactionPopup from './TransactionPopup';
export default function Header() {
  const [ethPrice, setEthPrice] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [accountData, setAccountData] = useState(null);
  const [showStakePopup, setShowStakePopup] = useState(false);
  const [showTransactionPopup, setShowTransactionPopup] = useState(false);
  const walletPopupRef = useRef(null);
  const router = useRouter();  
  const handleStakeClick = () => {
    setShowStakePopup(true);
};
const handleOutsideClick = (event) => {
  if (walletPopupRef.current && !walletPopupRef.current.contains(event.target)) {
    setShowPopup(false);
  }
};const navigateToBlockchainPage = () => {
  router.push('/blockchain'); // navigating to the blockchain page
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
    const publicKey=Cookie.get("publicKey")
    console.log("pubkey",publicKey)
    console.log("cookieaddress",createdAddress)
    if (createdAddress) {
      fetchAccountData();
    }
  }, []);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const fetchAccountData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/get/account", { withCredentials: true });
      setAccountData(response.data);
    } catch (error) {
      console.error("Error fetching wallet data:", error);
    }
  };

  const handleCreateAccount = async () => {
    try {

      const response = await axios.post("http://localhost:8000/api/wallet/generatekeys", { withCredentials: true });
      console.log(response.data)
      Cookie.set("walletaddress",response.data.address)
      Cookie.set("publicKey",response.data.publicKey)
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
  },[]);

  return (
    <section className={styles.header}>
      <section className={styles.topHeader}>
        ETH Price:{" "}
        <span className={styles.blueText}>${Number(ethPrice).toFixed(2)}</span>
      </section>
      <section className={styles.navbar}>
        <Image src="/svg/logo-white.svg" alt="Etherscan Logo" className={styles.logo} width={10} height={5} />
        <section className={styles.menu}>
          <p>Home</p>
          <p onClick={navigateToBlockchainPage}>
  Blockchain
</p>

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
              {accountData.address.slice(0,8)}...{accountData.address.slice(36,42)}
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
          <p>Public Key: {accountData.publicKey}</p>
          <p>privateKey Key: {accountData.privateKey}</p>
          <p>Address: {accountData.address}</p>
          <p>Balance: {accountData.balance} ETH</p>
          <p>stakedETH: {accountData.stakedEth} ETH</p>
          <button>Stake</button>
          <button>Transactions</button>
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