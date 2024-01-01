import {
    teacherTitle,
    orderTitle,
    icoValue,
    messageValue,
    clientNameValue,
    adressValue,
    substituteValue,
    contactTelValue,
    contactMailValue,
    startDate1Value,
    endDate1Value,
    campStudentsValue,
    campAdultsValue,
    campAgeValue,
    orderOkText,
    wrongTelValue,
    wrongIcoValue,
    messageForWrongIco

} from '///C:/Users/I551535/repositories/czechitas/own/automation-wdio-8/test/specs/homework/fixtures.js';


import order from "///C:/Users/I551535/repositories/czechitas/own/automation-wdio-8/test/specs/homework/orderClass.js"

describe('Objednávka pro MŠ/ZŠ', async () => {

    before(async () => {
        //Navigation
        await browser.reloadSession();
        await browser.url('/');
        await order.openOrderMenu(teacherTitle, orderTitle);
    });

    describe('Radne vyplneny formular', async () => {

        it('Vyplneni ICO a kontrola jména a adresy ', async () => {

            await order.setCompanyId(icoValue);
            const toastMsg = await order.getMessageText();
            await expect(toastMsg).toEqual(messageValue);

            // kontrola adresy a jmena.
            await order.checkEquality(order.clientId, clientNameValue);
            await order.checkEquality(order.addressId, adressValue);
        });

        it('Vyplneni ostatnich udaju a odeslani formulare', async () => {

            await order.setSubstitute(substituteValue);
            await order.setcontactName(substituteValue);
            await order.setcontactMail(contactMailValue);
            await order.setcontactTel(contactTelValue);
            await order.setStartDate(startDate1Value);
            await order.setEndDate(endDate1Value);

            await order.serviceButton.click();
            await order.setStudents(campStudentsValue);
            await order.setAge(campAgeValue);
            await order.setAdults(campAdultsValue);

            //odesilani formulare
            await order.sendCorrectOrder(orderOkText);

        });

    });
    describe('Spatne vyplnene ICO vyplneny formular', async () => {

        it('Vyplneni ICO a kontrola jména a adresy ', async () => {
            //Navigace
            await order.navigateToOrderPage();

            await order.setCompanyId(wrongIcoValue);
            await order.checkToastMsg(messageForWrongIco);

            // kontrola zda adresa a jmeno jsou prazdne
            await order.checkEquality(order.clientId, "");
            await order.checkEquality(order.addressId, "");
        });

    });
    describe('Spatny format telefonniho cisla', async () => {

        it('Vyplneni ICO a kontrola jména a adresy ', async () => {
            //Navigace 
            await order.navigateToOrderPage();

            await order.setCompanyId(icoValue);
            await order.checkToastMsg(messageValue);

            // kontrola adresy a jmena.
            await order.checkEquality(order.clientId, clientNameValue);
            await order.checkEquality(order.addressId, adressValue);
        });

        it('Vyplneni ostatnich udaju', async () => {

            await order.setSubstitute(substituteValue);
            await order.setcontactName(substituteValue);
            await order.setcontactMail(contactMailValue);
            await order.setcontactTel(wrongTelValue);
            await order.setStartDate(startDate1Value);
            await order.setEndDate(endDate1Value);

            await order.serviceButton.click();
            await order.setStudents(campStudentsValue);
            await order.setAge(campAgeValue);
            await order.setAdults(campAdultsValue);
            
            // odesilani formulare
            await order.sendIncorrectOrder();

        });

    });

    describe('Chybejici kontakt', async () => {

        it('Vyplneni ICO a kontrola jména a adresy ', async () => {
            
            await order.navigateToOrderPage();
            await order.setCompanyId(icoValue);
            await order.checkToastMsg(messageValue);

            // kontrola adresy a jmena.
            await order.checkEquality(order.clientId, clientNameValue);
            await order.checkEquality(order.addressId, adressValue);
        });

        it('Vyplneni formulare bez kontaktnich udaju', async () => {

            await order.setSubstitute(substituteValue);
            await order.setStartDate(startDate1Value);
            await order.setEndDate(endDate1Value);

            await order.serviceButton.click();
            await order.setStudents(campStudentsValue);
            await order.setAge(campAgeValue);
            await order.setAdults(campAdultsValue);

            // odesilani formulare
            await order.sendIncorrectOrder();

        });

    });
});