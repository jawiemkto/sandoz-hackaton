const puppeteer = require('puppeteer');
const config = require('./config');

const date = new Date().toISOString().substring(0, 10);

const delay = (time) => new Promise((resolve) =>
    setTimeout(resolve, time)
);
exports.delay = delay;

(async () => {
    try {

        console.log('Script start');

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
        });} catch(err) {
        console.log('error', err);
    }
})();


// "medicines.org.uk"
