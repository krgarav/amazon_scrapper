function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const flipkart = async (page, url, searchParam) => {
    await page.goto(url);
    await page.type(".Pke_EE", searchParam);
    await page.waitForSelector(".Pke_EE", { visible: true });
    await page.keyboard.press("Enter");
    await sleep(2000); // For data to be populate bot protection
    const parentDivHandle = (await page.$$("._1YokD2._3Mn1Gg"))[2];
    const productHaandles = await parentDivHandle.$$("._1xHGtK._373qXS");

    if (productHaandles.length !== 0) {
        const prdtArray = [];
        for (const productHandle of productHaandles) {
            try {
                const productBrand = await page.evaluate((el) => {
                    const brandElement = el.querySelector("._2WkVRV");
                    return brandElement ? brandElement.textContent : null;
                }, productHandle);
                const productName = await page.evaluate((el) => {
                    const nameElement = el.querySelector(".IRpwTa");
                    return nameElement ? nameElement.textContent : null;
                }, productHandle);

                const productPrice = await page.evaluate((el) => {
                    const priceElement = el.querySelector("._30jeq3");
                    return priceElement ? priceElement.textContent : null;
                }, productHandle);
                const productImageUrl = await page.evaluate((el) => {
                    const imageElement = el.querySelector("._2r_T1I");
                    return imageElement ? imageElement.getAttribute("src") : null;
                }, productHandle);
                const productUrl = await page.evaluate((el) => {
                    const urlElement = el.querySelector(".IRpwTa");
                    return urlElement
                        ? "flipkart.com" + urlElement.getAttribute("href")
                        : null;
                }, productHandle);

                const obj = {
                    productBrand,
                    productName,
                    productImageUrl,
                    productPrice,
                    productUrl,
                };
                prdtArray.push(obj);

            } catch (error) {
                console.error(error);
            }
        }
        return prdtArray
    } else {
        const parentDivHandles = (await page.$$("._1YokD2._3Mn1Gg"))[2];
        const productHandles = await parentDivHandles.$$("._13oc-S");
        const prdtArray = [];
        for (const productHandle of productHandles) {
            try {
                const productBrand = await page.evaluate((el) => {
                    const brandElement = el.querySelector("._2WkVRV");
                    return brandElement ? brandElement.textContent : null;
                }, productHandle);
                const productName = await page.evaluate((el) => {
                    const nameElement = el.querySelector("._4rR01T");
                    return nameElement ? nameElement.textContent : null;
                }, productHandle);

                const productPrice = await page.evaluate((el) => {
                    const priceElement = el.querySelector("._30jeq3._1_WHN1");
                    return priceElement ? priceElement.textContent : null;
                }, productHandle);
                const productImageUrl = await page.evaluate((el) => {
                    const imageElement = el.querySelector("._396cs4");
                    return imageElement ? imageElement.getAttribute("src") : null;
                }, productHandle);
                const productUrl = await page.evaluate((el) => {
                    const urlElement = el.querySelector("._1fQZEK");

                    return urlElement
                        ? "https://www.flipkart.com" + urlElement.getAttribute("href")
                        : null;
                }, productHandle);

                const obj = {
                    productBrand,
                    productName,
                    productImageUrl,
                    productPrice,
                    productUrl,
                };

                prdtArray.push(obj);

            } catch (err) {
                console.log(err);
            }
        }
        return prdtArray
    }
}

module.exports = flipkart;