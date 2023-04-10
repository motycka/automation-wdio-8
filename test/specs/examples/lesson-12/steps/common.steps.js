import { Given } from '@wdio/cucumber-framework';
import LoginPage from '../pages/login.page.js';
import {username, password, userFullName, resolvePlaceholder} from '../fixtures.js';


Given('user is on the Czechitas login page', async () => {
    await LoginPage.open();
});


Given('user {string} is logged in', async (user) => {
    switch (resolvePlaceholder(user)) {
        case userFullName:
            await LoginPage.login(username, password);
            break;
        default:
            throw Error(`Undefined user ${user}`);
    }
});
