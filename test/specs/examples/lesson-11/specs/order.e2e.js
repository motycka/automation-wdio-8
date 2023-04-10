import {
    ICO,
    clientName,
    address,
    substituteName,
    contactName,
    contactPhone,
    contactEmail,
    startDate,
    endDate
} from './fixtures.js'
import OrderPage from '../pages/order-new.page.js'

const NAVBAR_TEACHERS = 'Pro učitelé';
const NAVBAR_NEW_ORDER = 'Objednávka pro MŠ/ZŠ';
const ORDER_PAGE_TITLE = 'Nová objednávka';
const ORDER_FORM_TITLE = 'Objednávka akce';
const SUBURBAN_CAMP = 'Příměstský tábor';
const AFTERNOON = 'Odpolední';
const CHILDREN = 23;
const AGE = '8-12';
const ADULTS = 3;
const ORDER_SUCCESS = 'Děkujeme za objednávku';
const ORDER_SUCCESS_MESSAGE = 'Objednávka byla úspěšně uložena a bude zpracována. O postupu vás budeme informovat. Zkontrolujte si také složku SPAM';
const ARES_OK_TOAST = 'Data z ARESu úspěšně načtena';
const ORDER_SUCCESS_TOAST = 'Objednávka byla úspěšně uložena';

describe('Objednávka pro MŠ/ZŠ', async () => {

    beforeEach(async () => {
        await browser.reloadSession();
        await browser.url('/');
    });

    describe('Navigace', async () => {

        it('Aplikace umožňuje uživateli v menu Pro učitele vytvoření nové objednávky pro MŠ/ZŠ', async () => {
            await OrderPage.navbar(NAVBAR_TEACHERS, NAVBAR_NEW_ORDER);
            await expect(OrderPage.pageHeader).toHaveText(ORDER_PAGE_TITLE);
            await expect(OrderPage.contentHeader).toHaveText(ORDER_FORM_TITLE);
        });

    });

    describe('Aplikace umožňuje vytvoření nové objednávky pro MŠ/ZŠ', async () => {

        beforeEach(async () => {
            await OrderPage.navbar(NAVBAR_TEACHERS, NAVBAR_NEW_ORDER);
        })

        it('Po vyplnění IČO do formuláře Objednávka pro MŠ/ZŠ se automaticky načte jméno odběratele a adresa odběratele z ARESu', async () => {
            await OrderPage.setCompanyId(ICO);
            await expect(await OrderPage.getToastMessage()).toEqual(ARES_OK_TOAST);

            const values = await OrderPage.getFilledValues()
            await expect(values.client).toEqual(clientName);
            await expect(values.address).toEqual(address);

        });

        it('Uživatel nemůže uložit špatně vyplněnou přihlášku', async () => {
            await OrderPage.setCompanyId(ICO);
            await expect(await OrderPage.getToastMessage()).toEqual(ARES_OK_TOAST);

            await OrderPage.setClientName(clientName);
            await OrderPage.setAddress(address);
            await OrderPage.setSubstitute(substituteName);
            await OrderPage.setContactName(contactName);
            await OrderPage.setContactPhone(contactPhone);
            await OrderPage.setContactEmail(contactEmail);
            // missing date
            await OrderPage.selectType(SUBURBAN_CAMP);

            const suburbanCampForm = OrderPage.suburbanCampForm
            await suburbanCampForm.setTerm(AFTERNOON);
            await suburbanCampForm.setNumberOfStudents(CHILDREN);
            await suburbanCampForm.setStudentAge(AGE);
            await suburbanCampForm.setNumberOfAdults(ADULTS);
            await OrderPage.submit();

            await expect(OrderPage.pageHeader).toHaveText(ORDER_PAGE_TITLE);
            await expect(OrderPage.contentHeader).toHaveText(ORDER_FORM_TITLE);

        });

        it('Uživatel může uložit vyplněnou přihlášku na příměstský tábor', async () => {
            await OrderPage.setCompanyId(ICO);
            await expect(await OrderPage.getToastMessage()).toEqual(ARES_OK_TOAST);

            await OrderPage.setClientName(clientName);
            await OrderPage.setAddress(address);
            await OrderPage.setSubstitute(substituteName);
            await OrderPage.setContactName(contactName);
            await OrderPage.setContactPhone(contactPhone);
            await OrderPage.setContactEmail(contactEmail);
            await OrderPage.setStartDate(startDate);
            await OrderPage.setEndDate(endDate);
            await OrderPage.selectType(SUBURBAN_CAMP);

            const suburbanCampForm = OrderPage.suburbanCampForm
            await suburbanCampForm.setTerm(AFTERNOON);
            await suburbanCampForm.setNumberOfStudents(CHILDREN);
            await suburbanCampForm.setStudentAge(AGE);
            await suburbanCampForm.setNumberOfAdults(ADULTS);
            await OrderPage.submit();

            await expect(await OrderPage.getToastMessage()).toEqual(ORDER_SUCCESS_TOAST);
            await expect(OrderPage.contentHeader).toHaveText(ORDER_SUCCESS);
            await expect(OrderPage.orderConfirmationText).toHaveText(ORDER_SUCCESS_MESSAGE);
        });

    });

});
