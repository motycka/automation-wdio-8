import {newValidUser, alreadyExistingUser, invalidPasswordUser} from './fixtures_homework.js'
import Registration from './registration.page.js';


describe('Homework', async () => {

    beforeEach(async () => {
        await Registration.open();
    });


    it('should open page and create screenshot', async () => {

        await browser.saveScreenshot('registrace_page.png');

    });

    it('should show registration page', async () =>{

        await expect(await Registration.nameField).toBeDisplayed();
        await expect(await Registration.nameField).toBeEnabled();

        await expect(await Registration.emailField).toBeDisplayed();
        await expect(await Registration.emailField).toBeEnabled();

        await expect(await Registration.passwordField).toBeDisplayed();
        await expect(await Registration.passwordField).toBeEnabled();

        await expect(await Registration.confirmPaswordField).toBeDisplayed();
        await expect(await Registration.confirmPaswordField).toBeEnabled();

        await expect(await Registration.registrationButton).toBeDisplayed();
        await expect(await Registration.registrationButton.getText()).toEqual('Zaregistrovat');
    });

    it('should register with new user', async () =>{


        //Fill new user informations
        await Registration.register(newValidUser.name, newValidUser.email, newValidUser.password)

        //Check that registration was sucessfull and you are in Přihlášky section
        await expect(await Registration.header).toHaveText('Přihlášky');
        await expect(await Registration.userNameDropdown).toHaveText(newValidUser.name);
    })


    it('should not register user with already existing email', async () =>{

        //already existing credentials
        await Registration.register(alreadyExistingUser.name, alreadyExistingUser.email, alreadyExistingUser.password)

        //Check error messages
        await expect(await Registration.errorMessage.getText()).toEqual('Účet s tímto emailem již existuje');
        await expect(await Registration.toastMessage).toBeDisplayed();
        await expect(await Registration.toastMessage.getText()).toEqual('Některé pole obsahuje špatně zadanou hodnotu');

        //Check you are still on registration page
        await expect(await Registration.nameField).toBeDisplayed();
        await expect(await Registration.emailField).toBeDisplayed();
        await expect(await Registration.passwordField).toBeDisplayed();
        await expect(await Registration.confirmPaswordField).toBeDisplayed();
        await expect(await Registration.registrationButton).toBeDisplayed();
        await expect(await Registration.registrationButton.getText()).toEqual('Zaregistrovat');


    })

    it('should not register user with invalid numbers-only password', async () =>{
        await Registration.register(invalidPasswordUser.name, invalidPasswordUser.email, invalidPasswordUser.password)
        
        //Check error messages
        await expect(await Registration.toastMessage.getText()).toEqual('Některé pole obsahuje špatně zadanou hodnotu')
        await expect(await Registration.errorMessage.getText()).toEqual('Heslo musí obsahovat minimálně 6 znaků, velké i malé písmeno a číslici');

        //Check you are still on registration page
        await expect(await Registration.nameField).toBeDisplayed();
        await expect(await Registration.emailField).toBeDisplayed();
        await expect(await Registration.passwordField).toBeDisplayed();
        await expect(await Registration.confirmPaswordField).toBeDisplayed();
        await expect(await Registration.registrationButton).toBeDisplayed();
        await expect(await Registration.registrationButton.getText()).toEqual('Zaregistrovat');
        
    })

});
