"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";


export default function Home() {
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      setShowSearchResults(true);
    }
  };

  const handleLogoClick = () => {
    setShowSearchResults(false);
    setSearchQuery("");
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logoPlaceholder} onClick={handleLogoClick}>
          <h1 className={styles.logo}>Slice Scout</h1>
        </div>
        <nav className={styles.nav}>
          <button className={styles.navButton}>About</button>
          <button className={styles.navButton}>Login</button>
          <button className={styles.navButtonSignUp}>Sign up</button>
        </nav>
      </header>

      <main className={styles.main}>
        {!showSearchResults ? (
          <div className={styles.homeContent} style={{backgroundImage: "url('/pizza-background.jpg')"}}>
            <div className={styles.overlay}>
              <h1 className={styles.title}>
                Find the authentic <span className={styles.highlight}>99¢ Pizza</span> near You.
              </h1>
              <p className={styles.subtitle}>Saving New Yorker's wallets, $1 at a time.</p>

              <form onSubmit={handleSearch} className={styles.searchContainer}>
                <input
                  type="text"
                  placeholder="Enter a location to search for shops nearby"
                  className={styles.searchInput}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className={styles.searchButton}>
                  <Image src="/search-icon.png" alt="Search" width={16} height={16} />
                </button>
              </form>

              <div className={styles.location}>
                <Image src="/location-icon.png" alt="Location" width={16} height={16} />
                <span>Current Location</span>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.searchResultsPage}>
            <h1 className={styles.title}>Search Results</h1>
            
            <form onSubmit={handleSearch} className={styles.searchContainer}>
              <input
                type="text"
                placeholder="Enter a location to search for shops nearby"
                className={styles.searchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className={styles.searchButton}>
                <Image src="/search-icon.png" alt="Search" width={16} height={16} />
              </button>
            </form>

            <div className={styles.resultsContainer}>
              <div className={styles.filtersMenu}>
                <h2>Filters Menu</h2>
                <ul>
                  <li>
                    <input type="checkbox" id="open-now" />
                    <label htmlFor="open-now">Open Now</label>
                  </li>
                  <li>
                    <p>Rating</p>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className={styles.star}>★</span>
                    ))}
                  </li>
                  <li>
                    <p>Hours</p>
                    <input type="time" /> - <input type="time" />
                  </li>
                  <li>
                    <p>Price</p>
                    <input type="range" min="1" max="5" />
                  </li>
                </ul>
              </div>

              <div className={styles.searchResults}>
                {[1, 2, 3, 4].map((result) => (
                  <div key={result} className={styles.resultCard}>
                    <h3>Pizza Place {result}</h3>
                    <p>Phone: (123) 456-7890</p>
                    <p>Hours: 11:00 AM - 11:00 PM</p>
                    <p>Address: 123 Pizza St, New York, NY</p>
                    <div className={styles.resultFooter}>
                      <span className={styles.priceIndicator}>$</span>
                      <span className={styles.reviews}>4.5 ★ (500+ reviews)</span>
                      <a href="#" className={styles.website}>Website</a>
                      <button className={styles.findNow}>Find Now</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.mapPlaceholder}>
                
                <Image src="/map-placeholder.png" alt="Map" width={300} height={500} />
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.logoFooterPlaceholder}>
            <Image src="/logo.png" alt="Slice Scout" width={100} height={100} />
          </div>
          <nav className={styles.footerNav}>
            <button className={styles.footerLink}>Home</button>
            <button className={styles.footerLink}>About Us</button>
            <button className={styles.footerLink}>Account</button>
            <button className={styles.footerLink}>FAQ</button>
            <button className={styles.footerLink}>Contact</button>
          </nav>
        </div>
        <div className={styles.copyright}>
          <span>© 2024 Slice Scout</span>
          <div className={styles.socialLinks}>
            <Image src="/twitter-icon.png" alt="Twitter" width={16} height={16} />
            <Image src="/instagram-icon.png" alt="Instagram" width={16} height={16} />
          </div>
        </div>
      </footer>
    </div>
  );
}