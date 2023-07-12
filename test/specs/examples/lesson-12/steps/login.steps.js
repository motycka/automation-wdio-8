import { Given, When, Then } from '@wdio/cucumber-framework';
import LoginPage from '../pages/login.page.js';
import {resolvePlaceholder} from '../fixtures.js'

Given('user provides username {word} and password {word}', async (username, password) => {
    await LoginPage.emailField.setValue(resolvePlaceholder(username));
    await LoginPage.passwordField.setValue(resolvePlaceholder(password));
});

When('user clicks on login button', async () => {
    await LoginPage.loginButton.click();
});

When('user clicks on logout in the navbar', async () => {
    await LoginPage.logout();
});

Then('user sees {word} link in the navbar', async (linkName) => {
    await expect(LoginPage.navbarRight).toHaveText(linkName);
});

Then('user sees login form with button {word}', async (buttonText) => {
    await expect(LoginPage.emailField).toBeDisplayed();
    await expect(LoginPage.emailField).toBeEnabled();
    await expect(LoginPage.passwordField).toBeDisplayed();
    await expect(LoginPage.passwordField).toBeEnabled();
    await expect(LoginPage.loginButton).toBeDisplayed();
    await expect(LoginPage.loginButton).toBeEnabled();
    await expect(LoginPage.loginButton).toHaveText(buttonText);
});

Then('user is logged in as {string}', async (userFullName) => {
    await expect(await LoginPage.getCurrentUser()).toEqual(resolvePlaceholder(userFullName));
});

Then('toast message pops up: {string}', async (message) => {
    await expect(await LoginPage.getToastMessage()).toEqual(message);
});

Then('login form error is shown: {string}', async (error) => {
    await expect(await LoginPage.getFieldError()).toEqual(error)
});


