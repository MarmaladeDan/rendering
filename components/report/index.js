import { useState, useRef } from "react";
import axios from "axios";
import styles from "./Report.module.css";

export default function Report({ url }) {
  const urlRef = useRef(url);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");

  const handleClick = async () => {
    setOpen(!open);
    if (image || urlRef.current !== url) return;

    const { data } = await axios.post(`/api/report`, {
      data: url,
    });
    setImage(data);
  };

  return (
    <>
      <div className={styles.report} onClick={handleClick}>
        {url}
        <span>{open ? "-" : "+"}</span>
      </div>
      {open && (
        <div>
          {image ? (
            <img src={`data:image/png;base64,${image}`} />
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}
    </>
  );
}
