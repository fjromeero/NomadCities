import { randomStringGenerator, randomEmailGenerator } from "../utils/utils";

describe('Signup page', () => {
    beforeEach(() => {
        cy.visit('/signup');
    });

    it('should display the form', () => {
        cy.get('h1').contains('Sign up on NomadCities');
        cy.get('form').should('exist');
    });

    it('should display error messages for invalid inputs', () => {
        // Invalid email
        cy.get('#signup-email').type('invalidemail');
        cy.get('#signup-button').click();
        cy.get('#email-error').children('span').should('have.text', ' This email is not valid. Make sure it has a format like this: example@email.com ');

        // Invalid username
        cy.get('#signup-button').click();
        cy.get('#username-error').children('span').should('have.text',' Please enter a valid username ');

        // Invalid password (short)
        cy.get('#signup-username').type('username');
        cy.get('#signup-password').type('123');
        cy.get('#signup-button').click();
        cy.get('#password-error').children('span').should('have.text',' Password must be at least 8 characters ');

        // Invalid validation
        cy.get('#signup-username').type('username');
        cy.get('#signup-email').type('email@email.com');
        cy.get('#signup-password').type('password');
        cy.get('#signup-confirm').type('passworda');
        cy.get('#signup-button').click();
        cy.get('#confirm-error').children('span').should('have.text'," Password confirmation doesn't match Password ")
    });

    it('should display error message if username or email alredy exits', () => {
        const username = "admin"
        const email = "admin@example.com"
        const password = "password"

        cy.get('#signup-username').type(username);
        cy.get('#signup-email').type(email);
        cy.get('#signup-password').type(password);
        cy.get('#signup-confirm').type(password);

        cy.get('#signup-button').click();

        cy.get('.error-banner').should("exist");
    });

    it('should redirect to login with valid credentials', () => {
        const username = randomStringGenerator();
        const email = randomEmailGenerator();
        const password = "password";

        cy.get('#signup-username').type(username);
        cy.get('#signup-email').type(email);
        cy.get('#signup-password').type(password);
        cy.get('#signup-confirm').type(password);

        cy.get('#signup-button').click();

        cy.url().should('include', '/login');
    });

    it('should apply responsive styles on phone screens', () => {
        cy.viewport('iphone-8');
        cy.get('main').should('have.css', 'background-color', 'rgb(0, 0, 0)')
    })

});