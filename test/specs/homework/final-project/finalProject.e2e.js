import login from "///C:/Users/I551535/repositories/czechitas/own/automation-wdio-8/test/specs/homework/final-project/LoginClass.js"
import {
    nameValue,
    pswdValue,
    emailValue,
    existingEmail,
    wrongPswdvalue,
    toastMsgvalue,
    secondEmailValue
} from '///C:/Users/I551535/repositories/czechitas/own/automation-wdio-8/test/specs/homework/final-project/testData.js';

describe('Finalni project ', async () => {

    beforeEach(async () => {
        //navigace
        await browser.reloadSession();
        await browser.url('/prihlaseni');
        await expect(login.registerButton).toBeDisplayed();
        await login.registerButton.click();
    });

    it('Prihlasovani se spravnym udajem', async () => {
     
        await login.setNameValue(nameValue);
        await login.setEmailValue(emailValue);
        await login.setPswdValue(pswdValue);
        await login.setConfirmPswdValue(pswdValue);
        await login.confirmButton.click();
        //kontrola zda uzivatel je prihlasen
        const leftmenu = login.pageMenu.$(`=${nameValue}`);
        await expect(leftmenu).toBeDisplayed();
    
    });

    it('Prihlasovani s existujcim emailem ', async () => {
     
         await login.setNameValue(nameValue);
         await login.setEmailValue(existingEmail);
         await login.setPswdValue(pswdValue);
         await login.setConfirmPswdValue(pswdValue);
         await login.confirmButton.click();
            
            //kontrola zda uzivatel je prihlasen
         await expect(login.toastMsg).toBeDisplayed();
         await login.checkToastMsg(toastMsgvalue);
        
    });

    it('Prihlasovani se spatnym heslem', async () => {
     
        await login.setNameValue(nameValue);
        await login.setEmailValue(secondEmailValue);
        await login.setPswdValue(wrongPswdvalue);
        await login.setConfirmPswdValue(wrongPswdvalue);
        await login.confirmButton.click();
                
         //kontrola zda uzivatel je prihlasen
        await expect(login.toastMsg).toBeDisplayed();
        await login.checkToastMsg(toastMsgvalue);               
            
    });
});

