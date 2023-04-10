class AppPage {

    get toast() { return $('.toast-message'); }
    get navbarLeft() { return $('.navbar-nav'); }
    get mainContent() { return $('.main_content'); }
    get pageHeader() { return $('h1'); }
    get contentHeader() { return this.mainContent.$('h3'); }

    async getToastMessage() {
        await this.toast.waitForDisplayed();
        return await this.toast.getText();
    }

    async navbarSection(sectionText) {
        /*
        Jednodušší řešení by bylo použít:
        this.navbarLeft.$(`*=${sectionText}`).click();

        Složitější řešení nám dává trochu více jistoty, že klikáme na správný odkaz.
         */

        await this.navbarLeft.$$('.dropdown').find(async item => {
            return await item.getText() === sectionText;
        }).click();
    }

    async navbarItem(itemText) {
        /*
         Jednodušší řešení:
         this.navbarLeft.$(`*=${itemText}`).click();
         */

        await this.navbarLeft.$$('.dropdown-item').find(async item => {
            return await item.getText() === itemText;
        }).click();
    }

    async navbar(sectionText, itemText) {
        await this.navbarSection(sectionText);
        await this.navbarItem(itemText);
    }

}

export default AppPage;
