const puppeteer = require("puppeteer");

const main = async () => {
    try {
        // Puppeteer headless browser configuration
        const website = "https://web.whatsapp.com/";
        const browser = await puppeteer.launch({
            headless: false,
            executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
          });
        const page = await browser.newPage();

        //Go to the page X
        await page.goto(website);

        // //Searches person by title
        await page.waitForSelector("._1MXsz");
        await delay(5000);

        //Change to contact you want to send messages to
        const contactName = "Yassine Osd ";
        await page.click(`span[title='${contactName}']`);
        await page.waitForSelector("._3uMse");

        //Finds the message bar by data attribute
        const editor = await page.$("div[data-tab='1']");
        await editor.focus();
        //Send the message
        await page.evaluate(() => {
            const message = "This message is from the scrapper!";
            document.execCommand("insertText", false, message);
        });
        await page.click("span[data-testid='send']");

    } catch (e) {
        console.error(e);
    }
}

main();

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}