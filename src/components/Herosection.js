import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import moment from "moment";
import styles from "../styles/Home.module.css";
import {
  faCube,
  faGauge,
  faGlobe,
  faServer,
  faFileContract,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Chart = "/assets/chart.png";
export default function HeroSection() {
  const [showResult, setShowResult] = useState(true);
  const [blockResult, setBlockResult] = useState([]);
  const [transactionsResult, setTransactionsResult] = useState([]);
  const [ethPrice, setEthPrice] = useState("");
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [latestBlock, setLatestBlock] = useState("");

  const handleStakeConfirm = () => {
    const amountToStake = stakeAmount || "1";
    setShowStakePopup(false);
  };
  const handleTransactionsConfirm = () => {
    const recipient = recipientAddress || "Put reciever address";
    const data = transactionData || "0X0";
    setShowTransactionsPopup(false);
  };
  useEffect(() => {
    const getEthPrice = async () => {
      const response = await axios.get(
        `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=HVHTPWF3UJ8P5ZEDNUZYMT28ZZNEEURRD4`,
        {}
      );
      setEthPrice(response.data.result.ethusd);
    };
    const latesttransaction = async () => {
      try {
        const responsetransaction = await axios.get(
          `https://proof-of-stake.onrender.com/api/get/transactions`,
          { withCredentials: true }
        );
        console.log("hello buddyy", responsetransaction.data);
        if (responsetransaction.data && responsetransaction.data.transactions) {
          const sortedTransactions = responsetransaction.data.transactions
            .filter((txn) => txn.createdAt)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setTotalTransactions(responsetransaction.data.transactions.length);
          setTransactionsResult(sortedTransactions.slice(0, 5));
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    const getBlockInfo = async () => {
      const responseblocks = await axios.get(
        `https://proof-of-stake.onrender.com/api/get/blocks`,
        { withCredentials: true }
      );

      console.log("rrr", responseblocks.data);
      const blocksData = responseblocks.data.blocksdata;
      const lastFiveBlocks = blocksData.slice(-5).reverse();
      setLatestBlock(responseblocks.data.latestBlock);
      setBlockResult(lastFiveBlocks);

      // setTransactionsResult(responseblocks.data.blocksdata[0].transactions);
    };

    getEthPrice();
    getBlockInfo();
    latesttransaction();
    // latesttransaction();
  }, []);

// Get the current date and time
const currentDate = new Date();




  return (
    <section className={styles.heroSectionContainer}>
      {showResult && (
        <section>
          <section className={styles.latestResults_header}>
            <section>
              <section className={styles.latestResults_box}>
                <section className={styles.svgSection}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 417"
                    preserveAspectRatio="xMidYMid"
                    className={styles.svgEth}
                  >
                    <script
                      xmlns=""
                      id="argent-x-extension"
                      data-extension-id="dlcobpjiigpikoobohmabehhmhfoodbb"
                    />
                    <path
                      fill="#fff"
                      d="M127.961 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z"
                    />
                    <path
                      fill="#fff"
                      d="M127.962 0L0 212.32l127.962 75.639V154.158z"
                    />
                    <path
                      fill="#fff"
                      d="M127.961 312.187l-1.575 1.92v98.199l1.575 4.6L256 236.587z"
                    />
                    <path fill="#fff" d="M127.962 416.905v-104.72L0 236.585z" />
                    <path
                      fill="#eee"
                      d="M127.961 287.958l127.96-75.637-127.96-58.162z"
                    />
                    <path fill="#bbb" d="M0 212.32l127.96 75.638v-133.8z" />
                    <script
                      xmlns=""
                      type="text/javascript"
                      src="chrome-extension://fnnegphlobjdpkhecapkijjdkgcjhkib/inject-script.js"
                      id="one-x-extension"
                      data-extension-id="fnnegphlobjdpkhecapkijjdkgcjhkib"
                    />
                  </svg>
                </section>
                <section className={styles.hero_box}>
                  <p>ETHER PRICE</p>
                  <p className={styles.heroValues}>
                    ${Number(ethPrice).toFixed(2)}
                  </p>
                </section>
              </section>
              <span className={styles.divider}></span>
              <section className={styles.latestResults_box}>
                <section className={styles.svgSection}>
                  <FontAwesomeIcon icon={faGlobe} className={styles.svgIcons} />
                </section>
                <section className={styles.hero_box}>
                  <p>MARKET CAP</p>
                  <p className={styles.heroValues}>$196,968,104,207.00</p>
                </section>
              </section>
            </section>
            <section>
              <section className={styles.latestResults_box}>
                <section className={styles.svgSection}>
                  <FontAwesomeIcon
                    icon={faServer}
                    className={styles.svgIcons}
                  />
                </section>
                <section className={styles.hero_box}>
                  <p>TRANSACTIONS</p>
                  <p className={styles.heroValues}>{totalTransactions}</p>
                </section>
              </section>
              <span className={styles.divider}></span>
              <section className={styles.latestResults_box}>
                <section className={styles.svgSection}>
                  <FontAwesomeIcon icon={faGauge} className={styles.svgIcons} />
                </section>
                <section className={styles.hero_box}>
                  <p>LAST FINALIZED BLOCK</p>
                  <p className={styles.heroValues}>{latestBlock}</p>
                </section>
              </section>
            </section>
            <section>
              <section className={styles.hero_averageValue}>
                <p>Average Transaction Value</p>
                <Image
                  src={Chart}
                  alt="Chart"
                  className={styles.chart}
                  width={10}
                  height={10}
                />
              </section>
            </section>
          </section>
          <section className={styles.latestResults_body}>
            <section>
              <section className={styles.latestResults_body_title}>
                Latest Blocks
              </section>
              <table className={styles.latestResults_body_table}>
                <tbody>
                  {blockResult.map((block) => {
                    return (
                      <tr
                        className={`${styles.latestResults_body_tr} ${blockResult.indexOf(block) ==
                          blockResult.length - 1 && styles.lastTd
                          }`}
                        key={block.blockNumber}
                      >
                        <td className={styles.tdIcon}>
                          <FontAwesomeIcon icon={faCube} />
                        </td>
                        <td className={styles.tdBlock}>
                          <section className={styles.blueText}>
                            {block.nonce}
                          </section>
                          <section>
                            {
                             moment(block.createdDate).fromNow()
                            }
                          </section>
                        </td>
                        <td className={styles.tdTxns}>
                          <section>
                            Fee Recipient{" "}
                            <span className={styles.blueText}>
                              {block.validator ? (
                                <React.Fragment>
                                  {block.validator.address.slice(0, 6)}...
                                  {block.validator.address.slice(36)}
                                </React.Fragment>
                              ) : (
                                "N/A"
                              )}
                            </span>
                          </section>
                          <section>
                            <span className={styles.blueText}>
                              {block.transactions.length} txns
                            </span>
                          </section>
                        </td>
                        <td className={styles.tdValue}>
                          {block.validator.rewardAmount.toFixed(2)} Eth
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </section>
            <section>
              <section className={styles.latestResults_body_title}>
                Latest Transactions
              </section>
              <table className={styles.latestResults_body_table}>
                <tbody>
                  {transactionsResult.map((txn) => {
                    return (
                      <tr
                        className={`${styles.latestResults_body_tr} ${transactionsResult.indexOf(txn) ==
                          transactionsResult.length - 1 && styles.lastTd
                          }`}
                        key={txn.txhash}
                      >
                        <td className={styles.tdContract}>
                          <FontAwesomeIcon
                            icon={faFileContract}
                            className={styles.tdContract}
                          />
                        </td>
                        <td className={styles.tdBlock}>
                          <section className={styles.blueText}>
                            0x{txn.txHash?.slice(0, 10)}...
                          </section>
                          <section>
                            {
                              moment(txn.createdAt).fromNow()
                            }
                          </section>
                        </td>
                        <td className={styles.tdFromTo}>
                          <section>
                            From{" "}
                            <span className={styles.blueText}>
                              {txn.sender?.slice(0, 6)}...
                              {txn.sender?.slice(36)}
                            </span>
                          </section>
                          <section>
                            To{" "}
                            <span className={styles.blueText}>
                              {txn.recipient?.slice(0, 6)}...
                              {txn.recipient?.slice(36)}
                            </span>
                            <span className={styles.blueText}>
                              {txn.totalTransactions}
                            </span>
                          </section>
                        </td>
                        <td className={styles.tdValue}>
                          {Number(txn.amount).toFixed(2)} Eth
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </section>
          </section>
        </section>
      )}
    </section>
  );
}
