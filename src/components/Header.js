

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Cookie from 'js-cookie';
const Logo = "/assets/logo.png";
export default function Header() {
  const [ethPrice, setEthPrice] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [accountData, setAccountData] = useState(null);

  useEffect(() => {
    const createdAddress = Cookie.get("walletaddress");
    if (createdAddress) {
      fetchAccountData();
    }
  }, []);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const fetchAccountData = async () => {
    try {
      const response = await axios.get("https://proof-of-stake.onrender.com/api/get/account");
      setAccountData(response.data);
    } catch (error) {
      console.error("Error fetching wallet data:", error);
    }
  };

  const handleCreateAccount = async () => {
    try {
      const response = await axios.post("https://proof-of-stake.onrender.com/api/wallet/generatekeys");
      console.log(response.data)
      setAccountData(response.data);
      togglePopup();
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  useEffect(() => {
    const getEthPrice = async () => {
      const response = await axios.get("https://api.etherscan.io/api?module=stats&action=ethprice&apikey=HVHTPWF3UJ8P5ZEDNUZYMT28ZZNEEURRD4", {});
      console.log(response.data)
      console.log("hii",response.data.result.ethusd)
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
        <Image src={Logo} alt="Etherscan Logo" className={styles.logo} width={10} height={10} />
        <section className={styles.menu}>
          <p>Home</p>
          <p>
            Blockchain
            <span className={styles.arrow}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </p>
          <p>
            Token
            <span className={styles.arrow}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </p>
          <p>
            NFTs
            <span className={styles.arrow}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </p>
          <p>
            Resources
            <span className={styles.arrow}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </p>
          <p>
            Developers
            <span className={styles.arrow}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </p>
          <p onClick={togglePopup}>
            Wallet
          </p>
          <p>|</p>
          {accountData ? (
            <p className={styles.signIn} onClick={togglePopup}>
              {accountData.address}
            </p>
          ) : (
            // If the user doesn't have an account, display the "Create Account" button
            <p className={styles.signIn} onClick={handleCreateAccount}>
              Create Account
            </p>
          )}
        </section>
      </section>
      {showPopup && (
  <div className={styles.popupcontainer}>
    <div className={styles.popupcontent}>
      <button onClick={togglePopup} className={styles.closeButton}>
        X
      </button>
      {accountData ? (
        <div>
          <p>Public Key: {accountData.publicKey}</p>
          <p>privateKey Key: {accountData.privateKey}</p>
          <p>Address: {accountData.address}</p>
          <p>Balance: {accountData.balance} ETH</p>
          <p>stakedETH: {accountData.stakedEth} ETH</p>
          <button>Stake</button>
          <button>Transactions</button>
        </div>
      ) : (
        // Display Create Account content
        <div>
          <p>Public Key: {accountData.publicKey}</p>
          <p>Address: {accountData.address}</p>
          <p>Balance: {accountData.balance} ETH</p>
        </div>
      )}
    </div>
  </div>
)}
    </section>
  );
}