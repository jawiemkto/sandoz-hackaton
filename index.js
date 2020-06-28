const puppeteer = require('puppeteer');
const config = require('./config');
const medicine_uk_org = require('./medicines_org_uk_module/med_uk_index');
const clinicaltrails_gov = require('./clinicaltrials_gov_module/clinicaltrails_gov_index')

const date = new Date().toISOString().substring(0, 10);

const delay = (time) => new Promise((resolve) =>
    setTimeout(resolve, time)
);
exports.delay = delay;

(async () => {
    try {

        console.log('Run main script');

        const browser = await puppeteer.launch({
            headless: false,
            // executablePath: process.env.CHROMIUM_PATH,
            args: [
                '--no-sandbox',
                '--start-maximized',
                '--window-size=1920,1080',
                '--disable-features=site-per-process',
                '--disable-web-security',
                '--disable-dev-shm-usage'
            ],
            devtools: false,
            slowMo: 50
        });

        const page = await browser.newPage();
        const navigation = page.waitForNavigation({
            waitUntil: 'networkidle0',
        });

        await clinicaltrails_gov.runScript(page,navigation, delay, date);
        await medicine_uk_org.runScript(page, navigation, delay, date);

        await browser.close();
        console.log("Processed finished")

    } catch(err) {
        console.log('error', err);
    }
})();
