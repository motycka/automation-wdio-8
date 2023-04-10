import AppPage from './app.page.js';
import {getFieldValueById} from "./functions.js";

class OrderNewPage extends AppPage {

    constructor() {
        super();
        this._companyIdFieldId = 'ico';
        this._clientFieldId = 'client';
        this._addressFieldId = 'address';
        this._substituteFieldId = 'substitute';
        this._contactNameFieldId = 'contact_name';
        this._contactPhoneFieldId = 'contact_tel';
        this._contactEmailFieldId = 'contact_mail';
        this._startDate1Id = 'start_date_1';
        this._endDate1Id = 'end_date_1';
    }

    get companyIdField() { return this.mainContent.$(`#${this._companyIdFieldId}`); }
    get clientField() { return this.mainContent.$(`#${this._clientFieldId}`); }
    get addressField() { return this.mainContent.$(`#${this._addressFieldId}`); }
    get substituteField() { return this.mainContent.$(`#${this._substituteFieldId}`); }
    get contactNameField() { return this.mainContent.$(`#${this._contactNameFieldId}`); }
    get contactPhoneField() { return this.mainContent.$(`#${this._contactPhoneFieldId}`); }
    get contactEmailField() { return this.mainContent.$(`#${this._contactEmailFieldId}`); }
    get startDateField() { return this.mainContent.$(`#${this._startDate1Id}`); }
    get endDateField() { return this.mainContent.$(`#${this._endDate1Id}`); }
    get tabSelector() { return this.mainContent.$('#nav-tab'); }
    get submitButton() { return this.mainContent.$('.btn-primary'); }
    get orderConfirmationText() { return $('.card-body').$('p'); }
    get suburbanCampForm() { return new SuburbanCampForm(); }

    async getFilledValues() {
        return {
            companyId: await getFieldValueById(this._companyIdFieldId),
            client: await getFieldValueById(this._clientFieldId),
            address: await getFieldValueById(this._addressFieldId),
            substitute: await getFieldValueById(this._substituteFieldId),
            contactName: await getFieldValueById(this._contactNameFieldId),
            contactPhone: await getFieldValueById(this._contactPhoneFieldId),
            contactEmail: await getFieldValueById(this._contactEmailFieldId),
            startDate: await getFieldValueById(this._startDate1Id),
            endDate: await getFieldValueById(this._endDate1Id),
        }
    }

    async setCompanyId(value) {
        await this.companyIdField.setValue(value);
        await browser.keys('Enter');
    }

    async setClientName(value) {
        await this.clientField.setValue(value);
    }

    async setAddress(value) {
        await this.addressField.setValue(value);
    }

    async setSubstitute(value) {
        await this.substituteField.setValue(value);
    }

    async setContactName(value) {
        await this.contactNameField.setValue(value);
    }

    async setContactPhone(value) {
        await this.contactPhoneField.setValue(value);
    }

    async setContactEmail(value) {
        await this.contactEmailField.setValue(value);
    }

    async setStartDate(value) {
        await this.startDateField.setValue(value);
    }

    async setEndDate(value) {
        await this.endDateField.setValue(value);
    }

    async selectType(name) {
        await this.tabSelector.$(`=${name}`).click();
    }

    async submit() {
        await this.submitButton.click();
    }
}

class SuburbanCampForm {

    get campDateSelector() { return $('#camp-date_part'); }
    get numberOfStudentsField() { return $('#camp-students'); }
    get numberStudentAgeField() { return $('#camp-age'); }
    get numberNumberOfAdultsField() { return $('#camp-adults'); }

    async setTerm(value) {
        await this.campDateSelector.selectByVisibleText(value);
    }

    async setNumberOfStudents(value) {
        await this.numberOfStudentsField.setValue(value);
    }

    async setStudentAge(value) {
        await this.numberStudentAgeField.setValue(value);
    }

    async setNumberOfAdults(value) {
        await this.numberNumberOfAdultsField.setValue(value);
    }
}

export default new OrderNewPage();
