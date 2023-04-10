class LoginPage {

    constructor() {
        this.url = '/prihlaseni';
    }

    get emailField() { return $('#email'); }
    get passwordField() { return $('#password'); }
    get loginButton() { return $('.btn-primary'); }
    get fieldError() { return $('.invalid-feedback'); }
    get toast() { return $('.toast-message'); }
    get navbarRight() { return $('.navbar-right'); }
    get userNameDropdown() { return this.navbarRight.$('[data-toggle="dropdown"]'); }
    get logoutLink() { return $('#logout-link'); }

    async open() {
        await browser.reloadSession();
        await browser.url(this.url);
    }

    async login(username, password) {
        await this.emailField.setValue(username);
        await this.passwordField.setValue(password);
        await this.loginButton.click();
    }

    async logout() {
        await this.userNameDropdown.click();
        await this.logoutLink.click();
    }

    async getCurrentUser() {
        return await this.userNameDropdown.getText();
    }

    async getFieldError() {
        return await this.fieldError.getText();
    }

    async getToastMessage() {
        return await this.toast.getText();
    }

}

export default new LoginPage();

