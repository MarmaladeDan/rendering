import axios from "axios";
import { parseString } from "xml2js";

export default async (req, res) => {
  const {
    body: { data: url },
  } = req;

  const { data } = await axios.get(
    `${url}${url.endsWith("/") ? "" : "/"}sitemap.xml`
  );

  if (!data) {
    res.statusCode = 404;
    res.send("Could not find sitemap");
  }

  parseString(data, (err, result) => {
    if (err) {
      res.statusCode = 500;
      res.send("Error parsing XML");
    }

    const urls = result.urlset.url.map(({ loc }) => loc[0]);

    res.statusCode = 200;
    res.send(urls);
  });
};
