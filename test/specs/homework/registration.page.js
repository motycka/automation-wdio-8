class Registration {

    constructor(){
        this.url = '/registrace';
    }

    get emailField() { return $('#email'); }
    get nameField() { return $('#name');}
    get passwordField() { return $('#password');}
    get confirmPaswordField() { return $('#password-confirm');}
    get registrationButton() { return $('.btn-primary');}
    get errorMessage() { return $('.invalid-feedback');}
    get toastMessage() { return $('.toast-message');}
    get navbarRight() { return $('.navbar-right');}
    get userNameDropdown() { return this.navbarRight.$('[data-toggle="dropdown"]');}
    get header() {return $('h1');} 

    async open() {
        await browser.reloadSession();
        await browser.url(this.url);
    }


    async register(username, email, password) {
        await this.nameField.setValue(username);
        await this.emailField.setValue(email);
        await this.passwordField.setValue(password);
        await this.confirmPaswordField.setValue(password);
        await this.registrationButton.click();
    }
}

export default new Registration();