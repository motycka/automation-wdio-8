import { When, Then } from '@wdio/cucumber-framework';
import ApplicationsPage from '../pages/applications.page.js';


When('user navigates to page {word}', async (_) => {
    await ApplicationsPage.goToApplications();
});

When('user enters text into the search field: {string}', async (searchString) => {
    await ApplicationsPage.searchInTable(searchString);
    await ApplicationsPage.waitForTableToLoad();
});

Then('user can see between {int} to {int} applications', async (min, max) => {
    const count = (await ApplicationsPage.getTableRows()).length
    await expect(count).toBeGreaterThanOrEqual(min);
    await expect(count).toBeLessThanOrEqual(max);
});

Then('applications contain valid name\, date\, payment type and remaining amount to pay', async () => {
    for (const row of await ApplicationsPage.getTableRows()) {
        const values = await row.getValues();
        await expect(values.name).toMatch(/[a-zA-Z0-9#$@]/);
        await expect(values.date).toMatch(/(\d{2}.\d{2}.\d{4}|\d{2}.\d{2}. - \d{2}.\d{2}.\d{4})/);
        await expect(values.paymentType).toMatch(/(Bankovní převod|FKSP|Hotově|Složenka)/);
        await expect(values.toPay).toMatch(/\d{1,3}(| \d{0,3}) Kč/);
    }
});

Then('all names on applications contain {string}', async (searchString) => {
    for (const row of (await ApplicationsPage.getTableRows())) {
        const values = await row.getValues();
        await expect(values.name.toLowerCase()).toContain(searchString);
    }
});

Then('table shows applications:', async (table) => {
    for (const row of (await ApplicationsPage.getTableRows())) {
        const actual = await row.getValues();
        const expected = table.hashes()[index];
        await expect(actual.name).toEqual(expected.name);
        await expect(actual.date).toEqual(expected.date);
        await expect(actual.paymentType).toEqual(expected.paymentType);
        await expect(actual.toPay).toEqual(expected.toPay);
    }
});
