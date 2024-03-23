const { Cluster } = require('puppeteer-cluster');
const puppeteer = require("puppeteer-extra");
const stealthPlugin = require("puppeteer-extra-plugin-stealth");
const flipkart = require('../Sites/flipkart');
const amazon = require('../Sites/amazon');

puppeteer.use(stealthPlugin());

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
const MainData = []
const urls = ["https://www.flipkart.com/", "https://www.amazon.in/"]
const { executablePath } = require("puppeteer");


const clusterComp = async (searchParam) => {
    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_PAGE,
        maxConcurrency: 20,
        puppeteerOptions: {
            headless: true,
            executablePath: executablePath(),
            defaultViewport: false,
            userDataDir: "./tmp",
        }
    });

    await cluster.task(async ({ page, data: url }) => {


        switch (url) {
            case "https://www.flipkart.com/":

                const flipkartData = await flipkart(page, url, searchParam);
                MainData.push({ flipkartData: flipkartData })
                break;
            case "https://www.amazon.in/":
                
                const amazonData = await amazon(page, url, searchParam);
                MainData.push({ amazonData: amazonData })
                break;
            default:
                console.log(`No url selected.`);
                break;
        }
    });

    for (const url of urls) {
        await cluster.queue(url);
    }

    await cluster.idle();
    await cluster.close();
    return MainData;
}

module.exports = clusterComp;