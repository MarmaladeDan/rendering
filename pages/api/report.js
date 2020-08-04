import puppeteer from "puppeteer";

export default async (req, res) => {
  const {
    body: { data: url },
  } = req;

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const image = await page.screenshot({
      fullPage: true,
      encoding: "base64",
    });
    await browser.close();

    res.statusCode = 200;
    res.send(image);
  } catch (error) {
    res.statusCode = 500;
    res.send("Error taking screenshots");
  }
};
