'use client'
import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import { useRouter } from 'next/navigation'; // Ensure this is the correct import

export default function Search() {
    const router = useRouter();
    const [searchInput, setSearchInput] = useState('');

    const handleSearchSubmit = () => {
        router.push(`/Transactions?hash=${searchInput}`);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearchSubmit();
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
                            required
                            onChange={(e) => setSearchInput(e.target.value)}
                            onKeyPress={handleKeyPress} // Added key press event handler
                        />
                        <button className={styles.btn} onClick={handleSearchSubmit}>
                            {/* SVG and other elements */}
                        </button>
                    </section>
                </section>
            </section>
        </section>
    );
}
