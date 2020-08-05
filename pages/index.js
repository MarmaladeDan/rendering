import Head from "next/head";
import { useState } from "react";
import axios from "axios";
import Report from "../components/report";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [site, setSite] = useState("");
  const [siteList, setSiteList] = useState([]);

  const getSiteList = async () => {
    const { data } = await axios.post(`/api/sites`, {
      data: site,
    });
    setSiteList(data);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Marmalade | Rendering</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.search}>
        <input
          className={styles.input}
          type="text"
          placeholder="e.g. https://www.google.co.uk/"
          value={site}
          onChange={(e) => setSite(e.target.value)}
        />
        <button className={styles.button} onClick={getSiteList}>
          search
        </button>
      </div>
      {!siteList ? null : siteList.map((url) => <Report url={url} />)}
    </div>
  );
}
