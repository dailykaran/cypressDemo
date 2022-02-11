/// <reference types="cypress" />

describe('Select a item of the list', function() {

    beforeEach(function () {
        cy.visit('https://demoqa.com/select-menu');
        cy.url().should('include', 'select-menu');
    })

    it('Select Value', () => {
        // Select Value
        cy.get('#withOptGroup').click()
        cy.get('[class$="menu"] div div').contains('Group 2, option 2').click();
    })

    it('Old style Select Menu', () => {
        // Old style Select Menu
        cy.get('#oldSelectMenu').select('Yellow').should('have.value', '3');
        cy.wait(2000)
        cy.get('#oldSelectMenu').select(8).should('have.value', '8');
        cy.wait(2000)
        cy.get('#oldSelectMenu').select('5', 'Black').should('have.value', '5');
        cy.wait(2000)
    })

    it('Multi select drop down for single item', () => {
        // Multi select drop down for single item
        cy.get('#react-select-4-input').click({force: true});
        cy.get('[class$="option"]').contains('Blue').click()
        cy.get('[class$="multiValue"] div').should('have.text', 'Blue');
        cy.get('#react-select-4-input').clear({force: true});
        cy.get('#react-select-4-input').blur({ force: true });
    
    })

    it('Multi select drop down for multiple item', () => {
        // Multi select drop down for multiple item
        cy.get('#react-select-4-input').click({force: true});
        cy.get('[class$="option"]').each((getlistItem) => {
            cy.wrap(getlistItem).click();
        }).then((listItemText) => {
            cy.get('#react-select-4-input').blur({ force: true });
            //cy.log(listItemText.length)
            cy.get('[class$="multiValue"] > div svg').should('have.length', listItemText.length);
            cy.get('[class$="multiValue"] > div svg').then( elmlength => { 
                expect(elmlength.length).to.equal(listItemText.length);
                })
            })
        
        cy.get('#cars').select(['volvo']).invoke('val').should('deep.equal', ['volvo']);
        
        cy.get('#cars').select(['volvo', 'audi'] ).invoke('val').should('deep.equal', ['volvo', 'audi']);
        cy.get('#cars option[value="volvo"]').click({ctrlKey: true})
        cy.get('#cars option[value="volvo"]').trigger('mouseover').click();
        //cy.wait(2000);
    })

})