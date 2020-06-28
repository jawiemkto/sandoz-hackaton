module.exports = {
    runScript : async (page,navigation,delay,date) => {
        console.log('script start: clinicaltrails_gov ')

        let arr = ["pregabalin","gilteritinib"];
        for (let drug of arr){
            await page.goto(`https://www.clinicaltrials.gov/ct2/results?cond=${drug}&term=&cntry=&state=&city=&dist=`);
            await page.setViewport({ width: 1920, height: 1080 });
            await navigation;
            await page.waitForSelector('.ct-flexible > #docListBlock > #search-result-list-control #save-list-link');
            await page.click('.ct-flexible > #docListBlock > #search-result-list-control #save-list-link');
            await navigation;
            await page.waitForSelector('#save-list-form > #downloadForm #which-format');
            await page.click('#save-list-form > #downloadForm #which-format');
            await navigation;
            await page.select('#save-list-form > #downloadForm #which-format', 'csv');
            await page.waitForSelector('#save-list-form > #downloadForm #which-format');
            await page.click('#save-list-form > #downloadForm #which-format');
            await page.waitForSelector('.w3-display-container > #save-list-form > #downloadForm #submit-download-list');
            await navigation;
            await page.click('.w3-display-container > #save-list-form > #downloadForm #submit-download-list');
            await console.log("file downloaded");
            await delay(5000);}
    }
}
