import { getFirstSuperUserCredentials } from "../../src/utils/utils";

describe('Log In page', () => {

    it('should display the form', () => {
        cy.visit('/login');
        cy.get('h1').contains('Log in to NomadCities');
        cy.get('form').should('exist');
    });

    it('should display error message for invalid credentials', () => {
        cy.visit('/login');
        cy.get('#login-username').type('XXXXXXXXXXXXXXXXXXXX');
        cy.get('#login-password').type('XXXXXXXXXXXXXXXXXXXX');
        cy.get('#login-button').click();

        cy.get('.error-banner').children('span').should('exist');
        cy.get('.error-banner').children('span').should('contain.text', 'Incorrect username or password.');
    });

    it('should reveal the password when the show button is clicked', () => {
        cy.visit('/login');
        cy.get('#button-show').click();
        cy.get('#login-password').should('have.attr', 'type', 'text');

        cy.get('#button-show').click();
        cy.get('#login-password').should('have.attr', 'type', 'password');
    })

    it('should apply responsive styles on phone screens', () => {
        cy.visit('/login');
        cy.viewport('iphone-8');
        cy.get('main').should('have.css', 'background-color', 'rgb(0, 0, 0)')
    })

    it('should redirect to index page when logged in succesfully', () => {
        cy.visit('/login');
        const credentials = getFirstSuperUserCredentials();
        cy.get('#login-username').type(credentials.username);
        cy.get('#login-password').type(credentials.password);
        cy.get('#login-button').click();

        cy.location('pathname').should('eq', '/'); 
    });
});