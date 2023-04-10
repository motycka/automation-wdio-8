/**
 * Lesson 9: Page Object Pattern - Exercise 3
 */
import {username, password, userFullName} from '../../../fixtures.js'
import LoginPage from '../pages/login.page.js'

describe('Login Page', async () => {

    beforeEach(async () => {
        await LoginPage.open();
    });

    it('should show login form', async () => {
        await expect(await LoginPage.emailField).toBeDisplayed();
        await expect(await LoginPage.emailField).toBeEnabled();
        await expect(await LoginPage.passwordField).toBeDisplayed();
        await expect(await LoginPage.passwordField).toBeEnabled();
        await expect(await LoginPage.loginButton.getText()).toEqual('Přihlásit');
    });

    it('should login with valid credentials', async () => {

        await LoginPage.login(username, password)

        await expect(await LoginPage.getCurrentUser()).toEqual(userFullName);
    });

    it('should not login with invalid credentials', async () => {

        await LoginPage.login(username, 'invalid');

        // na stránce je jednak toast message
        await expect(await LoginPage.getToastMessage()).toEqual('Některé pole obsahuje špatně zadanou hodnotu');

        // ale také validační message ve formuláři
        await expect(await LoginPage.getFieldError()).toEqual('Tyto přihlašovací údaje neodpovídají žadnému záznamu.')

        // stále vidíme login formulář
        await expect(await LoginPage.emailField).toBeDisplayed();
        await expect(await LoginPage.passwordField).toBeDisplayed();
        await expect(await LoginPage.loginButton).toBeDisplayed();
    });

    it('should logout', async () => {
        await LoginPage.login(username, password);

        // zkontrolujeme, že jsme přihlášeni, jinak by test byl nevalidní
        await expect(await LoginPage.getCurrentUser()).toEqual(userFullName);

        await LoginPage.logout()

        await expect(await LoginPage.userNameDropdown.isDisplayed()).toBeFalsy();
        await expect(await LoginPage.navbarRight.getText()).toEqual('Přihlásit');
    });
});
