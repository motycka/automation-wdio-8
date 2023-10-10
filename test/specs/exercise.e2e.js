import {username, password} from './fixtures.js'
// import LoginPage from '../pageobjects/login.page'
// import ApplicationsPage from '../pageobjects/applications.page'

describe('Czechitas Login Page', async () => {

    it('should open login page', async () => {

        await browser.reloadSession();

        await browser.url('/prihlaseni');
        const windowSize = await browser.getWindowSize();
        console.log('Windows size: ' + windowSize);
        await browser.saveScreenshot('login_page.png');

        await browser.pause(5000);

    });

});
