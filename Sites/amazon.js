function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const amazon = async (page, url, searchParam) => {
    console.log(url, searchParam);
    await page.goto(url);
    await page.type("#twotabsearchtextbox", searchParam);
    await page.waitForSelector("#twotabsearchtextbox", { visible: true });
    await page.click("#nav-search-submit-button");
    await sleep(2000); // For removing bot protection
    const productHandles = await page.$$(
        ".s-main-slot.s-result-list.s-search-results.sg-row > .s-result-item"
    );

    const newArray = [];
    for (const productHandle of productHandles) {
        try {
            const productBrand = await page.evaluate((el) => {
                const brandElement = el.querySelector(".a-size-base-plus.a-color-base");
                return brandElement ? brandElement.textContent : null;
            }, productHandle);

            const productName = await page.evaluate((el) => {
                const nameElement = el.querySelector("h2 > a > span");
                return nameElement ? nameElement.textContent : null;
            }, productHandle);
            const productPrice = await page.evaluate((el) => {
                const priceElement = el.querySelector(".a-price-whole");
                return priceElement ? priceElement.textContent : null;
            }, productHandle);
            const productUrl = await page.evaluate((el) => {
                const urlElement = el.querySelector(
                    ".a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-normal"
                );
                return urlElement ? urlElement.getAttribute("href") : null;
            }, productHandle);

            const productImageUrl = await page.evaluate((el) => {
                const imageElement = el.querySelector(".s-image");
                return imageElement ? imageElement.getAttribute("src") : null;
            }, productHandle);
            const obj = {
                productBrand,
                productName,
                productImageUrl,
                productPrice,
                productUrl,
            };

            newArray.push(obj)

        } catch (error) {
            console.error(error)
        }
    }
    return newArray;

}

module.exports = amazon;