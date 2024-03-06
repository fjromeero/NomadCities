import { randomEmailGenerator, randomStringGenerator } from "../utils/utils";

let username = randomStringGenerator(7);
let email = randomEmailGenerator()
let password = randomStringGenerator(10);

describe('Current user profile page', () => {
    before(() => {
        // Just in case user is not created
        cy.visit('/signup');
        cy.get('#signup-username').type(username);
        cy.get('#signup-email').type(email);
        cy.get('#signup-password').type(password);
        cy.get('#signup-confirm').type(password);
        cy.get('#signup-button').click();
    });

    beforeEach(() => {
        cy.visit('/login');
        cy.get('#login-username').type(username);
        cy.get('#login-password').type(password);
        cy.get('#login-button').click();
        cy.visit('/me');
    });

    it('should display current user profile info', () => {
        cy.get('#profile-username').should('have.value', username);
        cy.get('#profile-email').should('have.value', email);
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
        username = randomStringGenerator(7);
        email = randomEmailGenerator()
        cy.get('#profile-username').clear().type(username);
        cy.get('#profile-email').clear().type(email);
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
        cy.get('#current-password').type(password);
        password = randomStringGenerator(10)
        cy.get('#new-password').type(password);
        cy.get('#password-button').click();
        cy.get('#success-banner').should('exist');
    });

    it('should display modal when edit tags button is clicked', () => {
        cy.get('#tag-button').click();
        cy.get('dialog').should('exist');
    })

    it('should not have any tags assigned yet', () => {
        cy.get('#tag-button').click();
        cy.get('#assigned-tags').should('contain.html', 'p').should('contain.text', "Not usertags assigned yet")
    })

    it('should change to assigned tags when clicked on available tags', () => {
        cy.get('#tag-button').click();
        cy.get('#available-tags').find("div").find('button').first().click();
        cy.get('#assigned-tags').find("div").should('contain.html', 'button');
    })

    it('should apply changes after click confirm button (add)', () => {
        cy.get('#tag-button').click();
        cy.get('#available-tags').find("div").find('button').first().click();
        cy.get('#assigned-tags').find("div").should('contain.html', 'button');
        cy.get('#confirm-button').click();
        cy.get('dialog').should('not.be.visible');
        cy.get('#current-tags').find('div').should('contain.html', 'div').should('contain.text', 'test_tag')
    })

    it('should apply changes after click confirm button (delete)', () => {
        cy.get('#tag-button').click();
        cy.get('#assigned-tags').find("div").find('button').first().click();
        cy.get('#assigned-tags').find("div").should('not.contain.html', 'button');
        cy.get('#confirm-button').click();
        cy.get('dialog').should('not.be.visible');
        cy.get('#current-tags').find('div').should('contain.html', 'p').should('contain.text', 'Not usertags assigned yet')
    })

    it('should discard tag changes when cancel button is clicked', () =>{
        cy.get('#tag-button').click();
        cy.get('#available-tags').find("div").find('button').first().click();
        cy.get('#assigned-tags').find("div").should('contain.html', 'button');
        cy.get('#cancel-button').click();
        cy.get('#tag-button').click();
        cy.get('#assigned-tags').should('contain.html', 'p').should('contain.text', "Not usertags assigned yet")
    })
})