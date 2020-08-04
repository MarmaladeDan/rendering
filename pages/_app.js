import axios from "axios";
import { SWRConfig } from "swr";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        shouldRetryOnError: false,
        fetcher: async (...args) => {
          const { data } = axios.get(...args);
          return data;
        },
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
