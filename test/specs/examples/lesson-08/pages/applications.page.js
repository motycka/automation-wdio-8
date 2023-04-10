class ApplicationsPage {

    constructor() {
        this.url = '/admin/prihlasky';
    }

    get table() { return $('.dataTable'); }
    get rows() { return this.table.$('tbody').$$('tr'); }
    get loading() { return $('#DataTables_Table_0_processing'); }
    get searchField() { return $('input[type="search"]'); }

    async open() {
        await browser.url(this.url);
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
        return this.rows;
    }
}

export default new ApplicationsPage();
