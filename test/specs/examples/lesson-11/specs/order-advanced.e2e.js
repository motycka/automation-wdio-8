function getFieldValueById(id) {
    return browser.execute((id) => {
        return document.getElementById(id).value
    }, id);
}

async function navigate(level1, level2) {
    await $(`*=${level1}`).click();
    await $(`*=${level2}`).click();
}

async function getPageName() {
    return await $('h1').getText();
}

async function setICO(ico) {
    await $('#ico').setValue(ico);
    await browser.keys('Enter');
    await $('.toast-message').waitForDisplayed();
}

async function getClient() {
    return await getFieldValueById('client');
}

async function getAddress() {
    return await getFieldValueById('address');
}

async function setOrder(substituteName, contactName, contactPhone, contactEmail, startDate, endDate) {
    await $('#substitute').setValue(substituteName);
    await $('#contact_name').setValue(contactName);
    await $('#contact_tel').setValue(contactPhone);
    await $('#contact_mail').setValue(contactEmail);
    await $('#start_date_1').setValue(startDate);
    await $('#end_date_1').setValue(endDate);
}

async function setUrbanCamp(campDate, students, age, teachers) {
    await $('*=Příměstský tábor').click();
    await $('#camp-date_part').selectByVisibleText(campDate);
    await $('#camp-students').setValue(students);
    await $('#camp-age').setValue(age);
    await $('#camp-adults').setValue(teachers);
}

async function submit() {
    await $('[type="submit"]').click();
}

async function getOrderConfirmation() {
    return await $('h3').getText();
}
 
const url = '/objednavka/pridat';
const navForTeachers = 'Pro učitelé';
const navOrder = 'Objednávka pro MŠ/ZŠ';
const timestamp = Math.floor(Date.now() / 1000);
const ICO = 22834958;
const clientName = 'Czechitas z.ú.';
const address = 'Václavské náměstí 837, 11000 Praha';
const substituteName = 'Jméno Zástupce';
const contactName = 'Jméno Kontaktu';
const contactPhone = 774952432;
const contactEmail = `email-${timestamp}@czechitas.com`;
const startDate = '2023-05-02';
const endDate = '2023-05-12';
const pageName = 'Nová objednávka'
const confirmation = 'Děkujeme za objednávku'

describe('Objednávka pro MŠ/ZŠ', async () => {

    beforeEach(async () => {
        await browser.reloadSession();
        await browser.url('/');
    });

    describe('Navigace', async () => {

        it('Aplikace umožňuje uživateli v menu Pro učitele vytvoření nové objednávky pro MŠ/ZŠ', async () => {
            await navigate(navForTeachers, navOrder);
            await expect(await getPageName()).toEqual(pageName);
        });

    });

    describe('Aplikace umožňuje vytvoření nové objednávky pro MŠ/ZŠ', async () => {

        beforeEach(async () => {
            await browser.url(url);
        });

        it('Po vyplnění IČO do formuláře Objednávka pro MŠ/ZŠ se automaticky načte jméno odběratele a adresa odběratele z ARESu', async () => {
            await setICO(ICO);
            await expect(await getClient()).toEqual(clientName);
            await expect(await getAddress()).toEqual(address);
        });

        it('Uživatel nemůže uložit špatně vyplněnou přihlášku', async () => {
            await setICO(ICO);
            await setUrbanCamp('Odpolední', 20, 10, 2);
            await submit();

            await expect(await getPageName()).toEqual(pageName);
            await expect(await getClient()).toEqual(clientName);
            await expect(await getAddress()).toEqual(address);
        });

        it('Uživatel může uložit vyplněnou přihlášku na příměstský tábor', async () => {
            await setICO(ICO);
            await setOrder(substituteName, contactName, contactPhone, contactEmail, startDate, endDate);
            await setUrbanCamp('Odpolední', 20, 10, 2);
            await submit();
    
            await expect(await getOrderConfirmation()).toEqual(confirmation);
        });

    });

});
