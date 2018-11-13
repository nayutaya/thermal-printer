
const bodyParser = require("body-parser");
const cors       = require("cors");
const express    = require("express");
const puppeteer  = require("puppeteer");
const tmp        = require("tmp");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const server = app.listen(8080, () => {
  console.log("http://127.0.0.1:" + server.address().port + "/");
});

app.get("/", (req, res, next) => {
  res.json({
    time: new Date().toISOString(),
  });
});

(async () => {
  const browser = await puppeteer.launch({args: ["--no-sandbox"]});

  app.options("/render_html", cors());
  app.post("/render_html", (req, res, next) => {
    console.log("body:", req.body);
    const width  = req.body.width;
    const height = 1;
    const html   = req.body.html;

    (async () => {
      const page = await browser.newPage();
      await page.setJavaScriptEnabled(false);
      await page.setOfflineMode(true);
      await page.setViewport({width: width, height: height});
      await page.setContent(html);
      const body = await page.evaluateHandle(() => document.body);
      const temporaryFile = tmp.fileSync({postfix: ".png"});
      await body.screenshot({
        path: temporaryFile.name,
        type: "png",
      });
      await page.close();

      res.sendFile(temporaryFile.name, {headers: {"Content-Type": "image/png"}}, () => {
        temporaryFile.removeCallback();
      });
    })()
      .catch((error) => {
        console.error("error:", error);
      });
  });
})()
  .catch((error) => {
    console.error("error:", error);
  });
