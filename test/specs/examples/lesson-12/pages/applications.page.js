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
            return new TableRow(row);
        });
    }
}

class TableRow {

    constructor(rowElement) {
        this.rowElement = rowElement;
    }

    async getValues() {
        const cols = await this.rowElement.$$('td');
        return {
            name: await cols[0].getText(),
            date: await cols[1].getText(),
            paymentType: await cols[2].getText(),
            toPay: await cols[3].getText()
        }
    }

    async getInfo() {
        await this.rowElement.$('[data-can="view"]').click();
        return new ApplicationInfoPage();
    }

}

class ApplicationInfoPage {

    get table() { return $('.table-twocols') }

    async getDetail() {
        return this.table.$$('tr').map(async row => {
            return await row.$$('td').map(async col => await col.getText());
        });
    }
}

// NEW INSTANCE !!!
export default new ApplicationsPage();
