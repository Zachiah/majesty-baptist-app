import jsdom from "jsdom";
import https from "https";
import fs from "fs";
import fetch from "node-fetch";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";

const baseUrl = "https://hymnary.org/hymnal/LH2019";
const __dirname = dirname(fileURLToPath(import.meta.url));

const parsePageHymns = (html) => {
  const dom = new jsdom.JSDOM(html);

  let originalRows = Array.from(
    dom.window.document.querySelector(".result-row.even").parentElement.children
  ).slice(1);

  let objectRows = originalRows.map((row) => {
    return {
      number: row.children[0].textContent,
      firstLine: row.children[1].textContent,
      title:
        row.children[2].textContent.substring(
          1,
          row.children[2].textContent.length - 1
        ) || row.children[1].textContent,
    };
  });

  return objectRows;
};

async function main() {
  const response = await fetch(baseUrl);
  const html = await response.text();

  const dom = new jsdom.JSDOM(html);
  const lastUrl =
    dom.window.document.querySelector(".pager-last").firstChild.href;

  // urls have ?page={number} at the end
  // so we need to get the last page number

  const lastPageNumber = +lastUrl.split("=")[1];

  // now make a list of urls by adding the page number to the base url from 0 all the way to the last page number
  const urls = Array.from(Array(lastPageNumber + 1).keys()).map((i) => {
    return `${baseUrl}?page=${i}`;
  });

  let hymns = [];

  for (let url of urls) {
    const response = await fetch(url);
    const html = await response.text();
    hymns = [...hymns, ...(await parsePageHymns(html))];
  }

  fs.writeFileSync(join(__dirname, "hymns.json"), JSON.stringify(hymns,null,2));
}

main();
