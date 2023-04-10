/**
 * Lesson 9: Page Object Pattern - Exercise 4
 */
import {username, password, expectedApplicationsPageRows} from '../../../fixtures.js'
import LoginPage from '../pages/login.page.js';
import ApplicationsPage from '../pages/applications.page.js';

describe('Applications Page', async () => {

    beforeEach(async () => {
        await LoginPage.open();
        await LoginPage.login(username, password)
        await ApplicationsPage.goToApplications();
    });

    it('should list all applications', async () => {
        const rows = await ApplicationsPage.getTableRows();

        await expect(rows.length).toEqual(expectedApplicationsPageRows);

        for (const row of rows) {
            console.log(row);
            await expect(row.name).toMatch(/^(?!\s*$).+/);
            await expect(row.date).toMatch(/(\d{2}.\d{2}.\d{4}|\d{2}.\d{2}. - \d{2}.\d{2}.\d{4})/);
            await expect(row.paymentType).toMatch(/(Bankovní převod|FKSP|Hotově|Složenka)/);
            await expect(row.toPay).toMatch(/\d{1,3}(| \d{0,3}) Kč/);
        }
    });

    it('should filter in applications', async () => {
        const searchText = 'mar';

        const unfilteredRows = await ApplicationsPage.getTableRows();

        await ApplicationsPage.searchInTable(searchText);

        const filteredRows = await ApplicationsPage.getTableRows();
        await expect(filteredRows.length).toBeLessThanOrEqual(unfilteredRows.length);

        for (const row of filteredRows) {
            console.log(row);
            await expect(row.name.toLowerCase()).toContain(searchText);
        }
    });
});
