/**
 * Lesson 2: Selectors
 *
 * Example HTML (simplified)
 *
 * <div class="card-body">
 *     <form method="POST" action="https://...">
 *         <input id="email" type="email" name="email" value="">
 *         <input id="password" type="password" name="password">
 *         <button type="submit" class="btn btn-primary">Přihlásit</button>
 *         <a class="btn btn-link" href="https://...">Zapomněli jste své heslo?</a>
 *     </form>
 * </div>
 */

describe('Czechitas Login Page', async () => {

    it('examples of selectors', async () => {

        await browser.reloadSession();
        await browser.url('/prihlaseni');

        /*
        CSS Selectors: tag
         */
        const formTagSelector = $('form');
        console.log(await formTagSelector.getHTML());

        const inputTagSelector = $('input');
        console.log(await inputTagSelector.getHTML());

        const buttonTagSelector = $('button');
        console.log(await buttonTagSelector.getHTML());

        /*
        CSS Selectors: id
         */
        const idEmailSelector = $('#email');
        console.log(await idEmailSelector.getHTML());

        const idPasswordSelector = $('#password');
        console.log(await idPasswordSelector.getHTML());

        /*
        CSS Selectors: class
         */
        const classSelector = $('.btn-primary');
        console.log(await classSelector.getHTML());

        /*
        CSS Selectors: attribute
         */
        const nameAttributeSelector = $('[name="email"]');
        console.log(await nameAttributeSelector.getHTML());

        const typeAttributeSelector = $('[type="password"]');
        console.log(await typeAttributeSelector.getHTML());

        // attribute obsahující text
        const attributeContainingTextSelector = $('[type*="ass"]');
        console.log(await attributeContainingTextSelector.getHTML());

        // attribute končící textem
        const attributeEndingWithTextSelector = $('[type$="word"]');
        console.log(await attributeEndingWithTextSelector.getHTML());

        // attribute začínající textem
        const attributeStartingWithTextSelector = $('[type^="pass"]');
        console.log(await attributeStartingWithTextSelector.getHTML());

        /*
        CSS Selectors: kombinovaný selector
         */
        const tagAndIdSelector = $('input#email');
        console.log(await tagAndIdSelector.getHTML());

        const tagAndAttributeSelector = $('input[type="password"]');
        console.log(await tagAndAttributeSelector.getHTML());

        const tagAndClassSelector = $('button.btn-primary');
        console.log(await tagAndClassSelector.getHTML());

        /*
        CSS Selectors: řetězení
         */
        const selectorChain = $('div').$('form').$('input[type$="word"]');
        console.log(await selectorChain.getHTML());

        /*
        Speciální WDIO selectory
         */
        const selectorByText = $('=Zapomněli jste své heslo?');
        console.log(await selectorByText.getHTML());

    });

});
