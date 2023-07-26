describe ('Objedvávka MŠ/ZŠ', async () => {

    it('Lze se prokliknout na stránku objednávky pro MŠ/ZŠ', async () => {

        await browser.reloadSession();
        await browser.url('/');
        const buttonProUcitele = $('.dropdown-toggle[href="https://team8-2022brno.herokuapp.com/pro-ucitele"]');
        await expect (buttonProUcitele).toHaveText("Pro učitelé")
        await buttonProUcitele.click()
        
        const buttonObjednavka = $('.dropdown-item[href="https://team8-2022brno.herokuapp.com/objednavka/pridat"]');

        await expect (buttonObjednavka).toHaveText("Objednávka pro MŠ/ZŠ")
        await buttonObjednavka.click()

        await browser.pause(5000);

    
    })

    it.only('Navigace na stránku objednávky pro MŠ/ZŠ a ověření stránky', async () => {


        await browser.reloadSession();
        await browser.url('/');
        const buttonProUcitele = $('.dropdown-toggle[href="https://team8-2022brno.herokuapp.com/pro-ucitele"]');
        await expect (buttonProUcitele).toHaveText("Pro učitelé")
        await buttonProUcitele.click()
        
        const buttonObjednavka = $('.dropdown-item[href="https://team8-2022brno.herokuapp.com/objednavka/pridat"]');

        await expect (buttonObjednavka).toHaveText("Objednávka pro MŠ/ZŠ")
        await buttonObjednavka.click()
        
        const pageHeader = $('h1')
        const objednavkaHeader = $('h3')

        await expect (pageHeader).toHaveText("Nová objednávka")
        await expect (objednavkaHeader).toHaveText("Objednávka akce")
    
    })

})