const config = require('./med_uk_conf');
const fs = require('fs');
let listItemsArray = [];
const csvWriter = require('csv-writer').createArrayCsvWriter;

module.exports = {
    runScript : async (page,navigation,delay,date) => {

        const outputWriter = csvWriter({
            path: './output.csv',
            header: ['Header', 'url to element', 'Scrapped content','Date']
        });
        console.log('script start: medicine.uk.org ')

        await page.goto(config.siteUrl, {waitUntil: 'networkidle0'});
        await page.setViewport({width: 1920, height: 1080});
        await navigation;

        await page.waitForSelector(config.searchInputSelector);
        await page.type(config.searchInputSelector, config.medicines);
        await page.click(config.searchInputConfirmButton);

        for (let idx = 1; idx < 20; idx++) {
            const href = await page.$eval(config.elementFromList(idx), el => el.getAttribute('href'));
            const header = await page.$eval(config.elementFromList(idx), el => el.innerText);
            let description = '';

            await page.goto(`${config.siteUrl}${href}`);
            await navigation;

            await page.waitForSelector(config.descriptionTableSelector);
            description = await page.$eval(config.descriptionTableSelector, table => table.innerText);

            listItemsArray.push([
                header,
                href,
                description,
                date
            ]);
            await page.goBack({waitUntil: 'networkidle0'})
            await outputWriter.writeRecords([listItemsArray[idx-1]])
                .then(() => console.log(`${idx} product data saved to csv`));
        }

        await delay (10000);
    }
}
