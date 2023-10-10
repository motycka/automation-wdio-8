describe('Homework', async () => {

    it('should open page and create screenshot', async () => {

        await browser.reloadSession();

        await browser.url('/registrace');
        await browser.saveScreenshot('hw_registration.png');
        await browser.pause(3000);

    });

});
