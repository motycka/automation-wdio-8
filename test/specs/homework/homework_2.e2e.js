describe('Homework 2', async () => {

    it('Selectors', async () => {

        await browser.url('/registrace');

        const name = $('#name');
        const pswd = $('#password');
        const email = $('#email');
        const pswd_conf = $('#password-confirm');
        const btn = $('[type="submit"]');
  
        console.log(await name.getHTML());
        console.log(await pswd.getHTML());
        console.log(await email.getHTML());
        console.log(await btn.getHTML());
        console.log(await pswd_conf.getHTML());

    });

});