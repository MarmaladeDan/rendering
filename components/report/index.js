import { useState, useRef } from "react";
import axios from "axios";
import styles from "./Report.module.css";

const sizes = [
  { name: "Mobile", width: 375 },
  { name: "Tablet", width: 768 },
  { name: "Desktop", width: 1200 },
];

export default function Report({ url }) {
  const urlRef = useRef(url);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [images, setImages] = useState({});

  const getImage = async (width, index) => {
    setActive(index);
    if (images[index] || urlRef.current !== url) return;

    const { data } = await axios.post(`/api/report`, {
      data: { url, width, index },
    });
    setImages({ ...data, ...images });
  };

  return (
    <>
      <div className={styles.report} onClick={() => setOpen(!open)}>
        {url.split(".co.uk")[1]}
        <span>{open ? "-" : "+"}</span>
      </div>
      {open && (
        <>
          <a className={styles.link} href={url} target="_blank" rel="noopener">
            Open link in new tab
          </a>
          <div className={styles.tabs}>
            {sizes.map(({ name, width }, index) => (
              <div
                className={`${styles.tab} ${
                  index === active ? styles.active : ""
                }`}
                onClick={() => getImage(width, index)}
              >
                {name}
              </div>
            ))}
          </div>
          <div>
            {active === -1 ? null : images[active] ? (
              <img
                className={styles.image}
                src={`data:image/png;base64,${images[active]}`}
              />
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </>
      )}
    </>
  );
}
