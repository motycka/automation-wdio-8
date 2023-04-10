import AppPage from './app.page.js';

class ApplicationsPage extends AppPage {

    get applicationsLink() { return $('=Přihlášky'); }
    get searchField() { return $('input[type="search"]'); }
    get loading() { return $('#DataTables_Table_0_processing'); }
    get table() { return $('.dataTable'); }
    get rows() { return this.table.$('tbody').$$('tr'); }

    async goToApplications() {
        await this.applicationsLink.click();
    }

    async waitForTableToLoad() {
        await browser.pause(1000);
        await this.loading.waitForDisplayed({ reverse: true});
    }

    async searchInTable(searchText) {
        await this.searchField.setValue(searchText);
    }

    async getTableRows() {
        await this.waitForTableToLoad();
        return this.rows.map(async row => {
            const cols = await row.$$('td');
            return {
                name: await cols[0].getText(),
                date: await cols[1].getText(),
                paymentType: await cols[2].getText(),
                toPay: await cols[3].getText()
            };
        });
    }
}

// NEW INSTANCE !!!
export default new ApplicationsPage();
