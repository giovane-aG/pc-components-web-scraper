import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36"
  );

  await page.goto("https://www.terabyteshop.com.br/busca?str=rtx+3060");

  const prodNameElements = await page.$$(
    ".prod-name"
  );
  const prodNames = await Promise.all(
    prodNameElements.map(async el => await el.evaluate(el => el.innerText))
  );

  const oldPriceElements = await page.$$(
    ".prod-old-price"
  );
  const oldPrices = await Promise.all(
    oldPriceElements.map(async el => await el.evaluate(el => el.innerText))
  );

  const newPriceElements = await page.$$(
    ".prod-new-price"
  );
  const newPrices = await Promise.all(
    newPriceElements.map(async el => await el.evaluate(el => el.innerText))
  );

  console.log('oldPrices :>> ', oldPrices.length);
  console.log('newPrices :>> ', newPrices.length);
  console.log('prodNames :>> ', prodNames.length);

  const products = []


  for (let i = 0; i < prodNames.length; i++) {
    console.log(i, oldPrices[i])
    products.push({
      name: prodNames[i],
      oldPrice: oldPrices[i],
      newPrice: newPrices[i]
    })
  }

  console.log(products);

  await browser.close();
})();
