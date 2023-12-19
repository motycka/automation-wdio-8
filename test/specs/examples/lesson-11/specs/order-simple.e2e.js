function getFieldValueById(id) {
    return browser.execute((id) => {
        return document.getElementById(id).value
    }, id);
}
 
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

describe('Objednávka pro MŠ/ZŠ', async () => {

    beforeEach(async () => {
        await browser.reloadSession();
        await browser.url('/');
    });

    describe('Navigace', async () => {

        it('Aplikace umožňuje uživateli v menu Pro učitele vytvoření nové objednávky pro MŠ/ZŠ', async () => {
            await $('*=Pro učitelé').click();
            await $('*=Objednávka pro MŠ/ZŠ').click();
            await expect($('h1')).toHaveText('Nová objednávka');
            await expect($('#ico')).toBeDisplayed();
        });

    });

    describe('Aplikace umožňuje vytvoření nové objednávky pro MŠ/ZŠ', async () => {

        beforeEach(async () => {
            await browser.url('/objednavka/pridat');
        });

        it('Po vyplnění IČO do formuláře Objednávka pro MŠ/ZŠ se automaticky načte jméno odběratele a adresa odběratele z ARESu', async () => {
            await $('#ico').setValue(ICO);
            await browser.keys('Enter');
            await $('.toast-message').waitForDisplayed();

            await expect(await getFieldValueById('client')).toEqual(clientName);
            await expect(await getFieldValueById('address')).toEqual(address);
        });

        it('Uživatel nemůže uložit špatně vyplněnou přihlášku', async () => {
            await $('#ico').setValue(ICO);
            await browser.keys('Enter');
            await $('.toast-message').waitForDisplayed();
            await $('*=Příměstský tábor').click();
            await $('input[type="submit"]').click();

            await expect($('h1')).toHaveText('Nová objednávka');
            await expect($('#ico')).toBeDisplayed();
            await expect($('#contact_name')).toBeDisplayed();
        });

        it('Uživatel může uložit vyplněnou přihlášku na příměstský tábor', async () => {
            await $('#ico').setValue(ICO);
            await browser.keys('Enter');
            await $('.toast-message').waitForDisplayed();
            await $('#substitute').setValue(substituteName);
            await $('#contact_name').setValue(contactName);
            await $('#contact_tel').setValue(contactPhone);
            await $('#contact_mail').setValue(contactEmail);
            await $('#start_date_1').setValue(startDate);
            await $('#end_date_1').setValue(endDate);
            await $('*=Příměstský tábor').click();
            await $('#camp-students').setValue(20);
            await $('#camp-age').setValue(10);
            await $('#camp-adults').setValue(2);
            await $('[type="submit"]').click();

            await expect($('h3')).toHaveText('Děkujeme za objednávku');
        });

    });

});
