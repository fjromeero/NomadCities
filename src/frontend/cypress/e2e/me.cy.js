describe('Current user profile page', () => {
    beforeEach(() => {

        cy.visit('/login');
        cy.get('#login-username').type('testuser');
        cy.get('#login-password').type('passwd');
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
        cy.get('#profile-username').clear().type('xxxxxxxxxxxxxxxxxxxxxxxxx');
        cy.get('#profile-email').clear().type('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx@email.com');
        cy.get('#profile-button').click();
        cy.get('#success-banner').should('exist');
    });

    after(() => {
        cy.get('#profile-username').clear().type('testuser');
        cy.get('#profile-email').clear().type('testuser@email.com');
        cy.get('#profile-button').click();
    });

})