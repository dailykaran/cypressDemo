describe('Elements Handles', function() {

    it('Text Box- implicit assertions and expect - Explicit assertion', () => {
        
        cy.visit('https://demoqa.com/text-box');
        cy.url().should('include', 'text-box');

        cy.get('#output').should('not.be.visible')
        cy.get('#userName').type('Testing QA')
          .should('have.class', 'mr-sm-2 form-control')

        cy.get('input#userName').invoke('val').should('not.be.empty')

        cy.get('#userEmail').type('QA123@example.in');
        cy.get('input#userEmail').invoke('val').then((txt) => { 
          expect(txt).to.contain('QA123@example.in') 
        });

        cy.get('#submit').click();
        // to match text content against a regular expression
        // "Invoke" a function on the previously yielded subject.
        // first need to invoke jQuery method "text()" 
        // and then match using regular expression
        cy.get('#output').should('be.visible')
          .find('#name')
          .should('have.text', 'Name:Testing QA')
          .should('contain', 'QA')
          .should('have.html', 'Name:Testing QA')
          .invoke('text')
          .should('match', /Name:Testing QA/i);

        // And assertion - 
        cy.get('#output #name').should('have.text', 'Name:Testing QA')
          .and('contain', 'QA')
          .and('have.html', 'Name:Testing QA');
    })

    it('Select under implicit assertion ', () => {
        cy.visit('https://demoqa.com/profile');
        cy.url().should('include', 'profile');

        // have.property
        const market = {
            Fruits: {
              Mango: {
                yellow: 'salem',
                green: 'madurai',
                },
            },
          }
          cy.wrap(market)
            .should('have.property', 'Fruits')
        //have.attr
        cy.get('.text-center a').first().should('have.attr', 'style')
          .invoke('replace', /\s/g, '') // string without whitespace
          .should('equal', 'font-weight:bold;')

        cy.visit('https://demoqa.com/links')
        // have.prop
        cy.get('#simpleLink').should('have.prop', 'target', '_blank');

        cy.visit('https://demoqa.com/text-box');
        cy.get('#submit').should('have.prop', 'class');
    })

})