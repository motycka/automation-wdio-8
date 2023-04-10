/**
 * Lesson 7: Code organization - Exercise 1
 */
import {username, password, userFullName} from '../../fixtures.js'

async function openLoginPage() {
    await browser.reloadSession();
    await browser.url('/prihlaseni');
}

function getEmailField() {
    return $('#email');
}

function getPasswordField() {
    return $('#password');
}

function getLoginButton() {
    return $('.btn-primary');
}

function getToast() {
    return $('.toast-message');
}

function getFieldError() {
    return $('.invalid-feedback');
}

function getRightNavbar() {
    return $('.navbar-right');
}

function getUserNameDropdown() {
    return getRightNavbar().$('[data-toggle="dropdown"]');
}

function getLogoutLink() {
    return $('#logout-link');
}

describe('Login Page', async () => {

    beforeEach(async () => {
        await openLoginPage();
    });

    it('should show login form', async () => {

        const emailField = await getEmailField();
        await expect(emailField).toBeDisplayed();
        await expect(emailField).toBeEnabled();

        const passwordField = await getPasswordField();
        await expect(passwordField).toBeDisplayed();
        await expect(passwordField).toBeEnabled();

        const loginButton = await getLoginButton();
        await expect(await loginButton.getText()).toEqual('Přihlásit');
    });

    it('should login with valid credentials', async () => {

        await getEmailField().setValue(username);
        await getPasswordField().setValue(password);
        await getLoginButton().click();

        await expect(await getUserNameDropdown().getText()).toEqual(userFullName);
    });

    it('should not login with invalid credentials', async () => {
        const emailField = getEmailField();
        const passwordField = getPasswordField();
        const loginButton = getLoginButton();

        await emailField.setValue(username);
        await passwordField.setValue('invalid');
        await loginButton.click();

        await expect(await getToast().getText()).toEqual('Některé pole obsahuje špatně zadanou hodnotu');

        await expect(await getFieldError().getText()).toEqual('Tyto přihlašovací údaje neodpovídají žadnému záznamu.');

        await expect(emailField).toBeDisplayed();
        await expect(passwordField).toBeDisplayed();
        await expect(loginButton).toBeDisplayed();
    });

    it('should logout', async () => {
        await getEmailField().setValue(username);
        await getPasswordField().setValue(password);
        await getLoginButton().click();

        await expect(await getUserNameDropdown().getText()).toEqual(userFullName);

        await getUserNameDropdown().click();
        await getLogoutLink().click();

        await expect(await getUserNameDropdown().isDisplayed()).toBeFalsy();
        await expect(await getRightNavbar().getText()).toEqual('Přihlásit');
    });
});
