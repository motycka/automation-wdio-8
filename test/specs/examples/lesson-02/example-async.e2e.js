/**
 * Lesson 2: async / await
 */
describe('Czechitas Login Page', async () => {

    it('should demonstrate async / await', async () => {

        await browser.reloadSession();

        await browser.url('/prihlaseni');

        const pageTitleSelector = $('h1');

        /*
        Vypíše Promise { <pending> }, protože jsem počkali na resoluci promisu
        */
        console.log(pageTitleSelector);

        /*
        Vypíše an object of type Element, protože jsme počkali na promise a ten byl resolvován
         */
        console.log(await pageTitleSelector);

        /*
        Vypíše Promise { <pending> } protože jsme zavolali funkci getText() na neresolvovaném promisu
        */
        console.log(pageTitleSelector.getText());

        /*
        Vypíše Promise { <pending> } protože jsme zavolali funkci na resolvovaném objektu ale nepočkali jsme
        na resoluci funkce getText()
        */
        console.log((await pageTitleSelector).getText());

        /*
        Vypíše "Přihlášení" protože jsme zavolali funkci a vyčkali jsem na resoluci celého řetězce promisů.
        To samé bychom dosáhli zavoláním:
        console.log(await (await pageTitleSelector).getText());
         */
        console.log(await pageTitleSelector.getText());

    });

});
