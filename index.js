import puppeteer from "puppeteer";

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch(
        // {headless: false}
        {headless: 'new'}
    )
    let page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto("https://fanghanhu.github.io/Puppeteer-Test/");
    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });

    const link = await page.locator("a").waitHandle();

    const pageTarget = page.target();

    const [newTarget] = await Promise.all([
        browser.waitForTarget((target) => target.opener() === pageTarget),
        link.click(),
    ]);

    page = await newTarget.page();

    console.log("before click");
    //const button = await page.locator('#button').waitHandle({timeout: 2000});
    const button = await page.waitForSelector("#button", {timeout: 2000});
    await button.click();
    console.log("After click");

    await browser.close();
})();
