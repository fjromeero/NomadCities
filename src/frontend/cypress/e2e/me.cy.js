import { randomEmailGenerator, randomStringGenerator } from "../utils/utils";

describe('Current user profile page', () => {
    before(() => {
        // Just in case user is not created
        cy.visit('/signup');
        cy.get('#signup-username').type("testuser");
        cy.get('#signup-email').type("testuser@email.com");
        cy.get('#signup-password').type("somepasswd");
        cy.get('#signup-confirm').type("somepasswd");
        cy.get('#signup-button').click();
    });

    beforeEach(() => {
        cy.visit('/login');
        cy.get('#login-username').type('testuser');
        cy.get('#login-password').type('somepasswd');
        cy.get('#login-button').click();
        cy.visit('/me');
    });

    it('should display current user profile info', () => {
        cy.get('#profile-username').should('have.value', 'testuser');
        cy.get('#profile-email').should('have.value', 'testuser@email.com');
    });

    it('should display error when trying to update to existing username', () => {
        cy.get('#profile-username').clear().type('admin');
        cy.get('#profile-button').click();
        cy.get("#input-error").should('have.text', 'This username is alredy linked to an account.')
    });

    it('should display error when trying to update with non valid email', () => {
        cy.get('#profile-email').clear().type('admin@email');
        cy.get('#profile-button').click();
        cy.get("#input-error").should('have.text', 'This address is invalid')
    });

    it('should display error when trying to update to existing email', () => {
        cy.get('#profile-email').clear().type('admin@email.com');
        cy.get('#profile-button').click();
        cy.get("#input-error").should('have.text', 'This email is alredy linked to an account.')
    });

    it('should display confirm banner when profile is updated successfully', () => {
        cy.get('#profile-username').clear().type(randomStringGenerator());
        cy.get('#profile-email').clear().type(randomEmailGenerator());
        cy.get('#profile-button').click();
        cy.get('#success-banner').should('exist');

        cy.get('#profile-username').clear().type("testuser");
        cy.get('#profile-email').clear().type("testuser@email.com");
        cy.get('#profile-button').click();
        cy.get('#success-banner').should('exist');
    });

    it('should display error when trying to update password with wrong current password', () => {
        cy.get('#current-password').type('passwd');
        cy.get('#new-password').type('passwd');
        cy.get('#password-button').click();
        cy.get("#input-error").should('have.text', 'Incorrect password');
    });

    it('should display confirm banner when password is updated successfully', () => {
        cy.get('#current-password').type('somepasswd');
        cy.get('#new-password').type('passwd');
        cy.get('#password-button').click();
        cy.get('#success-banner').should('exist');
    });

    after(() => {
        cy.get('#current-password').type('passwd');
        cy.get('#new-password').type('somepasswd');
        cy.get('#password-button').click();
    });
})