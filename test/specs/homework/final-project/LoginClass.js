
class Login {

    //getters for selectors
    
    get nameInputId() { return $('#name') };
    get emailInputId() { return $('#email') };
    get pswdInputId() { return $('#password') };
    get comfirmPswd() { return $('#password-confirm') };
    get confirmButton() { return $('.btn-primary') };
    get registerButton() {return $('.btn-secondary')};
    get pageMenu() { return $('.top-menu').$('.menu_content'); }
    get toastMsg() { return $('.toast-message') };
  

    async setNameValue(inputValue) {
        await this.nameInputId.setValue(inputValue);
    }
    async setEmailValue(inputValue) {
        await this.emailInputId.setValue(inputValue);
    }
    async setPswdValue(inputValue) {
        await this.pswdInputId.setValue(inputValue);
    }
    async setConfirmPswdValue(inputValue) {
        await this.comfirmPswd.setValue(inputValue);
    }
    async getMessageText() {
        return await this.toastMsg.getText();
    }
    async checkToastMsg(masgText){
        await expect(await this.getMessageText()).toEqual(masgText);
    }

}
export default new Login();