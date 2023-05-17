describe('Homework', async () => {

    it('should open page and create screenshot', async () => {

        await browser.reloadSession();

        await browser.url('/registrace');

        const windowSize = await browser.getWindowSize();
        console.log(windowSize);

        const allCookies = await browser.getCookies();
        console.log(allCookies);

        await browser.saveScreenshot('registrace.png');

        await browser.pause(5000);


    });

});
