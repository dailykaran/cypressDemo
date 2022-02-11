/// <reference types="cypress" />

describe('Interactions - drag and drop resizable and sortable', function() {
// Installation
// npm install --save-dev @4tw/cypress-drag-drop
// Cypress is loaded (usually in your cypress/support/commands.js) 
// import '@4tw/cypress-drag-drop';
// The "drag" command is a child command and accept only elements.
// The "move" command is a child command from "drag-drop". deltaX and deltaY as an object parameter to move the element in x- and y-position.

    it('drag and drop - checking the respones by plugin', () => {
        cy.visit('https://demoqa.com/droppable');
        cy.url().should('include', 'droppable');
        cy.get('#draggable').drag('#droppable').then((success) => {
            cy.log(success)
            expect(success).be.true
        });
    });

    it('drag and drop - checking by trigger event using datatransfer(HTML api)', () => {
        // The DataTransfer object is used to hold the data that is being dragged during a drag and drop operation.
        cy.visit('https://kitchen.applitools.com/ingredients/drag-and-drop');
        const dataTransfer = new DataTransfer();
        cy.get('#menu-ice-cream').trigger('dragstart', { dataTransfer });
        cy.get('#plate-items').trigger('drop', { dataTransfer });
        cy.get('#menu-ice-cream').trigger('dragend');
        cy.get('#plate-ice-cream').should('have.text', 'Ice Cream');

        // below line drag command from cypress-drag-drop
        cy.get('#menu-hamburger').drag('#plate-items').then((success) => {
            cy.log(success)
            expect(success).be.true
        });
        cy.get('#plate-hamburger').should('have.text', 'Hamburger');
    })

    it('drag and drop - x and y', () => {
        cy.visit('https://demoqa.com/droppable');
        cy.url().should('include', 'droppable');
        // drag - move the source element(drag) to target element(drop) (x, y)
        //cy.get('#draggable').move({ deltaX: 250, deltaY: 50 }).should('have.class', '.ui-state-highlight');
        //cy.contains('Dropped').should('not.have.class', '.ui-state-highlight');
        
        cy.get('#draggable').move({ deltaX: 250, deltaY: 50 });
        cy.get('#droppable').should('have.text', 'Dropped!');
        //cy.wait(2000);
    });
    
})



describe('Resize the dialog or screen', () => {

    it('resize', () => {
        cy.visit('https://demoqa.com/resizable');
        
        cy.get('#resizableBoxWithRestriction .react-resizable-handle').move({ deltaX: 250, deltaY: 50 })
        //cy.get('#resizableBoxWithRestriction .react-resizable-handle').trigger('resize', { deltaX: 50, deltaY: 250 });
        
        cy.get('#resizable .react-resizable-handle')
        .trigger('mousedown', {clientX: 505, clientY: 357})
        .trigger('mousemove', {clientX: 357, clientY: 505})
        .trigger('mouseup')
    })

});
