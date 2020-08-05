import { args, executablePath, headless } from "chrome-aws-lambda";
import puppeteer from "puppeteer-core";

const getTLD = (url) => `.${url.split(".").slice(-3).join(".").split("/")[0]}`;

export default async (req, res) => {
  const {
    body: {
      data: { url, width, index },
    },
  } = req;

  const cookies = [
    {
      domain: getTLD(url),
      expires: 1627391734,
      httpOnly: false,
      name: "CookieControl",
      path: "/",
      sameSite: "strict",
      secure: false,
      value:
        '{"necessaryCookies":["CookieControl","PHPSESSID","intercom-id-akczehk9","intercom-session-akczehk9","partner","WAM_GUID","WCFY","LDI","BBI","NYDI","SDI","introducer"],"optionalCookies":{"analytics":"accepted","marketing":"accepted"},"initialState":{"type":"closed"},"statement":{},"consentDate":1594818745042,"consentExpiry":365,"interactedWith":true,"user":"EE93EC4B-7C6B-4725-8C39-9B71F4BF6532"}',
    },
  ];

  const launchArgs =
    process.env.NODE_ENV !== "production"
      ? {
          executablePath:
            "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        }
      : {
          args,
          executablePath: await executablePath,
          headless,
        };

  try {
    const browser = await puppeteer.launch(launchArgs);
    const page = await browser.newPage();
    await page.setCookie(...cookies);
    await page.setViewport({ width, height: 812, deviceScaleFactor: 1 });
    await page.goto(url);
    const image = await page.screenshot({
      fullPage: true,
      encoding: "base64",
    });
    await browser.close();

    res.statusCode = 200;
    res.send({ [index]: image });
  } catch (error) {
    res.statusCode = 500;
    res.send(error.message);
  }
};
