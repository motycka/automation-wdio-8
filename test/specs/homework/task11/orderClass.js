import { Key } from 'webdriverio';
class Order {

    //getters for selectors
    get pageMenu() { return $('.top-menu').$('.menu_content'); }
    get ico() { return $('#ico'); }
    get toastMsg() { return $('.toast-message') };
    get clientId() { return $('#client') };
    get addressId() { return $('#address') };

    get substituteName() { return $('#substitute') };
    get contactName() { return $('#contact_name') };
    get contactTelId() { return $('#contact_tel') };
    get contactMailId() { return $('#contact_mail') };
    get startDate1Id() { return $('#start_date_1') };
    get endDate1Id() { return $('#end_date_1') };
    get campStudentsId() { return $('#camp-students') };
    get campAgeId() { return $('#camp-age') };
    get campAdultsId() { return $('#camp-adults') };
    get serviceButton() { return $('#nav-tab').$('#nav-home-tab') };
    get submitOrderButton() { return $('.btn-primary') };
    get orderOk() { return $('.toast-message') };


    async openOrderMenu(navItemName, menuItemName) {
        const teacherMenu = this.pageMenu.$(`=${navItemName}`);
        await teacherMenu.click();

        const orderItem = this.pageMenu.$(`=${menuItemName}`);
        await orderItem.click();
    }
    async setCompanyId(inputValue) {
        await this.ico.setValue(inputValue);
        await browser.keys(Key.Enter)
    }
    async getMessageText() {
        return await this.toastMsg.getText();
    }

    async setSubstitute(inputValue) {
        await this.substituteName.setValue(inputValue);
    }

    async setcontactName(inputValue) {
        await this.contactName.setValue(inputValue);
    }

    async setcontactTel(inputValue) {
        await this.contactTelId.setValue(inputValue);
    }

    async setcontactMail(inputValue) {
        await this.contactMailId.setValue(inputValue);
    }
    async setStartDate(inputValue) {
        await this.startDate1Id.setValue(inputValue);
    }
    async setEndDate(inputValue) {
        await this.endDate1Id.setValue(inputValue);
    }
    async setStudents(inputValue) {
        await this.campStudentsId.setValue(inputValue);
    }
    async setAge(inputValue) {
        await this.campAgeId.setValue(inputValue);
    }
    async setAdults(inputValue) {
        await this.campAdultsId.setValue(inputValue);
    }
    async setAdults(inputValue) {
        await this.campAdultsId.setValue(inputValue);
    }
    async checkEquality(elementId, elementText) {
        await expect(elementId).toBeDisplayed();
        await expect(await elementId.getValue()).toEqual(elementText);
    }

    async sendOrder() {
        await expect(this.submitOrderButton).toBeDisplayed()
        await this.submitOrderButton.click();
    }
    async checkOrder(orderStatusText) {
        await expect(await this.getMessageText()).toEqual(orderStatusText);
    }
    async navigateToOrderPage(){
        await browser.reloadSession();
        await browser.url('/objednavka/pridat');
    }

    async checkToastMsg(masgText){
        await expect(await this.getMessageText()).toEqual(masgText);
    }
    async sendIncorrectOrder(){

        await this.sendOrder();
        await expect(this.ico).toBeDisplayed();
    }
    async sendCorrectOrder(msgText){
        await this.sendOrder();
        await this.checkOrder(msgText);
    }
}
export default new Order();