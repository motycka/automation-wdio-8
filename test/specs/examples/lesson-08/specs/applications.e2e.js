/**
 * Lesson 8: Page Object Pattern - Exercise 2
 */
import {username, password, expectedApplicationsPageRows} from '../../../fixtures.js'
import LoginPage from '../pages/login.page.js';
import ApplicationsPage from '../pages/applications.page.js';

describe('Applications Page', async () => {

    beforeEach(async () => {
        await LoginPage.open();
        await LoginPage.login(username, password);
        await ApplicationsPage.open();
    });

    it('should list all applications', async () => {
        const rows = await ApplicationsPage.getTableRows();

        expect(rows.length).toEqual(expectedApplicationsPageRows);

        for (const row of rows) {
            console.log(await row.getText());
            const cols = await row.$$('td');
            await expect(cols[0]).toHaveText(/^(?!\s*$).+/);
            await expect(cols[1]).toHaveText(/(\d{2}.\d{2}.\d{4}|\d{2}.\d{2}. - \d{2}.\d{2}.\d{4})/);
            await expect(cols[2]).toHaveText(['Bankovní převod', 'FKSP', 'Hotově', 'Složenka']);
            await expect(cols[3]).toHaveText(/\d{1,3}(| \d{0,3}) Kč/);
        }
    });

    it('should filter in applications', async () => {
        const searchText = 'mar';

        const unfilteredRows = await ApplicationsPage.getTableRows();

        await ApplicationsPage.searchInTable(searchText);

        const filteredRows = await ApplicationsPage.getTableRows();
        expect(filteredRows.length).toBeLessThanOrEqual(unfilteredRows.length);

        for (const row of filteredRows) {
            console.log(await row.getText());
            const cols = await row.$$('td');
            await expect(cols[0]).toHaveTextContaining(searchText, { ignoreCase: true });
        }
    });
});
