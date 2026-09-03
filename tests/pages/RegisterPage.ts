import {Page, Locator} from '@playwright/test';

export class RegisterPage {
    readonly page: Page;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly registerButton: Locator;
    readonly registerTitle: Locator;

    readonly radioTitle: Locator;
    readonly passwordInput: Locator;
    readonly comboDays: Locator;
    readonly comboMonths: Locator;
    readonly comboYears: Locator;

    readonly checkboxNewsletter: Locator;
    readonly checkboxSpecialOffers: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly companyInput: Locator;
    readonly address1Input: Locator 
    readonly countryCombo: Locator

    readonly stateInput: Locator;
    readonly cityInput: Locator;
    readonly zipcodeInput: Locator;
    readonly mobileNumberInput: Locator;

    readonly createAccountButton: Locator;
    readonly accountCreatedTitle: Locator;
     

    constructor(page: Page) {
        this.page = page;
        this.radioTitle = page.locator('[data-qa="title"]');
        this.nameInput = page.locator('[data-qa="signup-name"]');
        this.emailInput = page.locator('[data-qa="signup-email"]');

        this.registerButton = page.locator('[data-qa="signup-button"]');
        this.registerTitle = page.getByText('Create an account');

        this.passwordInput = page.locator('[data-qa="password"]');
        this.comboDays = page.locator('[data-qa="days"]');
        this.comboMonths = page.locator('[data-qa="months"]');
        this.comboYears = page.locator('[data-qa="years"]');

        this.checkboxNewsletter = page.locator('newsletter');
        this.checkboxSpecialOffers = page.locator('optin');

        this.firstNameInput = page.locator('[data-qa="first_name"]');
        this.lastNameInput = page.locator('[data-qa="last_name"]');
        this.companyInput = page.locator('[data-qa="company"]');
        this.address1Input = page.locator('[data-qa="address"]');
        this.countryCombo = page.locator('[data-qa="country"]');

        this.stateInput = page.locator('[data-qa="state"]');
        this.cityInput = page.locator('[data-qa="city"]');
        this.zipcodeInput = page.locator('[data-qa="zipcode"]');
        this.mobileNumberInput = page.locator('[data-qa="mobile_number"]');

        this.createAccountButton = page.locator('[data-qa="create-account"]');
        this.accountCreatedTitle = page.getByText('Account Created!');
    }


    async register(name : string, email: string) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.registerButton.click();
    }

    async selectTitleGender(title: 'Mr' | 'Mrs') {
        if (title === 'Mr') {
            await this.radioTitle.first().check();
        } else if (title === 'Mrs') {
            await this.radioTitle.last().check();
        }   
    }
    async fillPersonalInformation(password: string, day: string, month: string, year: string) {
        
        await this.passwordInput.fill(password);
        await this.comboDays.selectOption(day);
        await this.comboMonths.selectOption(month);
        await this.comboYears.selectOption(year);

        //await this.checkboxNewsletter.check();
        //await this.checkboxSpecialOffers.check();

    }

    async fillAddressInformation(firstName: string, lastName: string, company: string, address: string, country: string, state: string, city: string, zipcode: string, mobileNumber: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.companyInput.fill(company);
        await this.address1Input.fill(address);
        await this.countryCombo.selectOption(country);
        await this.stateInput.fill(state);
        await this.cityInput.fill(city);
        await this.zipcodeInput.fill(zipcode);
        await this.mobileNumberInput.fill(mobileNumber);

        await this.createAccountButton.click();
    }

}