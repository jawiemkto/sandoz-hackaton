const config = require('./med_uk_conf');

module.exports = {
    runScript : async (page,navigation,delay,date) => {
        console.log('script start: medicine.uk.org ')

        await page.goto(config.siteUrl, {waitUntil: 'networkidle0'});
        await page.setViewport({width: 1920, height: 1080});
        await navigation;

        await page.waitForSelector(config.searchInputSelector);
        await page.type(config.searchInputSelector, config.medicines);
        await page.click(config.searchInputConfirmButton);

        await delay (100000);
    }
}
