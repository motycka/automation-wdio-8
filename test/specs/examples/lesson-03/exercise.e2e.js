/**
 * Lesson 3: Selectors and element interactions
 */
import {username, password} from '../../fixtures.js'

describe('Login And Applications Page', async () => {

    it('should login and list applications', async () => {

        await browser.reloadSession();

        await browser.url('/prihlaseni');

        // zjištění stavu políčka email
        const emailField = $('#email');
        console.log('Email field s displayed: ' + await emailField.isDisplayed());
        console.log('Email field s enabled: ' + await emailField.isEnabled());

        // zjištění stavu políčka password
        const passwordField = $('#password');
        console.log('Password field s displayed: ' + await passwordField.isDisplayed());
        console.log('Password field s enabled: ' + await passwordField.isEnabled());

        // výpis textu tlačítka na přihlášení
        const loginButton = $('.btn-primary');
        console.log('Login button text: ' + await loginButton.getText());

        // výpis atributu href odkazu a zapomenuté heslo
        const link = $('form').$('a').getAttribute('href');
        console.log('Forgot password? link: ' + await link);

        // přihlášení
        await emailField.setValue(username);
        await passwordField.setValue(password);
        await loginButton.click();

        // Vypiš jméno přihlášeného uživatele
        const currentUser = $('.navbar-right').$('strong').getText()
        console.log(await currentUser);

        // přechod na stránku s kurzy
        await $('=Přihlášky').click();
        await browser.pause(1000);

        // page title text check
        console.log('Page title is: ' + await $('h1').getText()) // TODO upravit cviceni

        // výpis přihlášených kurzů
        const rows = await $('.dataTable').$('tbody').$$('tr');
        console.log('There are ' + rows.length + ' rows in the table');
        for (const row of rows) {
            const rowText = await row.getText()
            console.log(rowText);
        }

        // Bonus - filtrování tabulky
        await $('input[type="search"]').setValue('mar');
        await browser.pause(1000);
        await $('#DataTables_Table_0_processing').waitForDisplayed({ reverse: true });

        const filteredRows = await $('.dataTable').$('tbody').$$('tr')
        console.log('There are ' + filteredRows.length + ' filtered rows in the table');
        for (const row of filteredRows) {
            console.log(await row.getText());
        }
    });

});
