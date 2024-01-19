import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import { useRouter } from 'next/navigation'; // Import useRouter

export default function Search() {
    const [searchInput, setSearchInput] = useState("");
    const router = useRouter(); // Initialize useRouter

    const changeHandler = (e) => {
        setSearchInput(e.target.value);
    };

    const handleSearch = async () => {
      const modifiedSearchInput = searchInput.substring(2);        router.push(`/Transactions?hash=${modifiedSearchInput}`);
        setSearchInput(''); // Optional: Clear the search input after search
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <section className={styles.searchContainer}>
            <section className={styles.searchHeader}>
                <section className={styles.searchSection}>
                    <h3>The Ethereum Blockchain Explorer</h3>
                    <section className={styles.input_section}>
                        <input
                            className={styles.inputField}
                            type="text"
                            id="inputField"
                            name="inputField"
                            maxLength="120"
                            placeholder="Search by Address / Txn Hash / Block / Token / Domain Name"
                            value={searchInput}
                            onChange={changeHandler}
                            onKeyPress={handleKeyPress}
                        />
                        <button className={styles.btn} onClick={handleSearch}>
                            {/* SVG and other elements */}
                        </button>
                    </section>
                </section>
            </section>
        </section>
    );
}
