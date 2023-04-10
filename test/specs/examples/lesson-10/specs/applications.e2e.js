/**
 * Lesson 10: Page Object Pattern - Exercise 5
 */
import {username, password, expectedApplicationsPageRows} from '../../../fixtures.js'
import LoginPage from '../pages/login.page.js';
import ApplicationsPage from '../pages/applications.page.js';

describe('Applications Page', async () => {

    beforeEach(async () => {
        await LoginPage.open();
        await LoginPage.login(username, password);
        await ApplicationsPage.goToApplications();
    });

    it('should list all applications', async () => {
        const rows = await ApplicationsPage.getTableRows();

        await expect(rows.length).toEqual(expectedApplicationsPageRows);

        for (const row of rows) {
            const values = await row.getValues();
            console.log(values);
            await expect(values.name).toMatch(/[a-zA-Z]/);
            await expect(values.date).toMatch(/(\d{2}.\d{2}.\d{4}|\d{2}.\d{2}. - \d{2}.\d{2}.\d{4})/);
            await expect(values.paymentType).toMatch(/(Bankovní převod|FKSP|Hotově|Složenka)/);
            await expect(values.toPay).toMatch(/\d{1,3}(| \d{0,3}) Kč/);
        }
    });

    it('should filter in applications', async () => {
        const searchText = 'mar';

        const unfilteredRows = await ApplicationsPage.getTableRows();

        await ApplicationsPage.searchInTable(searchText);

        const filteredRows = await ApplicationsPage.getTableRows();
        expect(filteredRows.length).toBeLessThanOrEqual(unfilteredRows.length);

        for (const row of filteredRows) {
            const values = await row.getValues();
            console.log(values);
            await expect(values.name.toLowerCase()).toContain(searchText);
        }
    });

    it('should open application detail', async () => {

        // vybere třetí přihlášku v tabulce (musí tam samozřejmě být alespoň 3)
        const thirdRow = (await ApplicationsPage.getTableRows())[2];
        const [lastName, firstName, secondName] = (await thirdRow.getValues()).name.split(' ');

        // otevře detail přihlášky
        const applicationDetailPage = await thirdRow.getInfo();

        // získá obsah detailu přihlášky
        const applicationDetail = await applicationDetailPage.getDetail();

        await expect(applicationDetail).toContainEqual(['Křestní jméno žáka:', [firstName, secondName].join(' ')]);
        await expect(applicationDetail).toContainEqual(['Příjmení žáka:', lastName]);
    });
});
