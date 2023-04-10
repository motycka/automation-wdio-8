describe('Assertions', async () => {

    beforeEach(async () => {
        await browser.reloadSession();
        await browser.url('/prihlaseni');
    });

    describe('passing assertions examples', async () => {

        it('assertion examples: WDIO assertions', async () => {
            const header = await $('h1');
            const email = await $('#email');

            /*
            Používejte WDIO assertace pokud je to možné.
            WDIO assertace automaticky awaitují výsledek.
             */
            await expect(email).toBeExisting();
            await expect(email).toBeEnabled();

            // differnet ways to match text
            await expect(header).toHaveText('Přihlášení');
            await expect(header).toHaveText(['Přihlášení', 'přihlášení']);
            await expect(header).toHaveTextContaining('hlášení');
        });

        it('assertion examples: Expect assertions', async () => {
            const header = await $('h1');
            const email = await $('#email');

            /*
            Standardní Expect assertační funkce nebudou atuomaticky awaitovat výsledek, proto je potřeba druhý await.
            Používej, pokud assertovaný objekt není WDIO objekt.
             */
            await expect(await email.isDisplayed()).toBeTruthy();
            await expect(await header.getText()).toEqual('Přihlášení');
        });
    });

    describe('failing assertions examples', async () => {

        it('element should exist', async () => {
            const element = await $('#not-existing');
            await expect(element).toBeExisting();
        });

        it('element should have expected text', async () => {
            const element = await $('h1');
            await expect(element).toHaveText('Přihlášky');
        });

    });

    describe('assertions with regular expressions', async () => {

        it('regular expressions', async () => {
            const header = await $('h1');

            await expect(header).toHaveText(/[a-zA-Z]/);
            await expect(header).toHaveText(/(Přihlášení|přihlášení|Login)/);
        });

    });

});
