/// <reference types="cypress-iframe" />
//// reference types="cypress" />

before(function() {
    //cy.visit("https://demoqa.com/")
 })

describe('Alert iFrame Windows', function() {

    it('New tab - checking the respones', () => {

        //Window - Get the window object of the page that is currently active.
        //stub - A stub is a way to modify a function and delegate control over its behavior
        cy.visit('https://demoqa.com/browser-windows');
        cy.url().should('include', 'windows');
        cy.location('pathname').should('eq', `/browser-windows`)
        
        cy.window().then(win => {
            cy.stub(win, 'open').as('open')
        })
        cy.get('#tabButton').click()
        cy.get('@open').should('be.calledWith', '/sample')
        cy.window().then(win => {
            win.location.href = '/sample'
            cy.get('#sampleHeading').should('contain', 'sample page');
        })
        cy.go('back');
    })

    it('New window - checking the respones', () => {

        cy.visit('https://demoqa.com/browser-windows');
        cy.url().should('include', 'windows');
        cy.location('pathname').should('eq', `/browser-windows`)
        
        cy.window().then(win => {
            cy.stub(win, 'open').as('open')
        })
        cy.get('#windowButton').click()
        cy.get('@open').should('be.calledWith', '/sample')
        cy.window().then(win => {
            win.location.href = '/sample'
            cy.get('#sampleHeading').should('contain', "sample page");
        })
        cy.go('back');
    })


    it('iframe', () => {
        cy.visit('https://demoqa.com/frames');
        cy.url().should('include', 'frames');

        // install the plugin
        //npm install -D cypress-iframe
        // In your cypress/support/commands.js file, add the following: import 'cypress-iframe'
        // frameLoaded - This command checks that an iframe has loaded onto the page
        // iframe - This will cause subsequent commands to be executed inside of the given iframe
        cy.frameLoaded('#framesWrapper #frame1Wrapper iframe');
        cy.iframe('#frame1Wrapper iframe').find('#sampleHeading').should('have.text', 'This is a sample page');

        cy.frameLoaded('#framesWrapper #frame2Wrapper iframe');
        cy.iframe('#frame2Wrapper iframe')
          .find('#sampleHeading')
          .should('have.text', 'This is a sample page');
    })

    it('Alerts and confirm Ok', () => {
        cy.visit('https://demoqa.com/alerts');
        cy.url().should('include', 'alerts');

        // cy objects are standard Node event emitters. 
        //That means you can use "on" methods to bind and unbind from events.
        //Below alert ok
        cy.get('#alertButton').click();
        cy.on('window:alert', (alt) => {            
            expect(alt).to.equal('You clicked a button');
        })
        cy.on('window:confirm', () => true);

        //Below confirm ok
        cy.get('#confirmButton').click();
        cy.on('window:confirm', (alt) => {
            expect(alt).to.equal('Do you confirm action?');
        })
        cy.on('window:confirm', () => false);
        //cy.get('#confirmResult').should('contain.text', 'Ok')

        
    })

    it('confirm Cancel', () => {
        cy.visit('https://demoqa.com/alerts');
        cy.url().should('include', 'alerts');

        // cy objects are standard Node event emitters. 
        //That means you can use "on" methods to bind and unbind from events.
        //Below confirm cancel
        cy.get('#confirmButton').click();
        cy.on('window:confirm', (alt) => {            
            expect(alt).to.equal('Do you confirm action?');
        })
        cy.on('window:confirm', () => false);
        cy.get('#confirmResult').should('contain.text', 'Cancel')

    })

    it('Prompt Ok', () => {
        cy.visit('https://demoqa.com/alerts');
        cy.url().should('include', 'alerts');

        //Window - Get the window object of the page that is currently active.
        //stub - A stub is a way to modify a function and delegate control over its behavior to you
        //below prompt ok, you can not see the prompt dialog on browser while execution of test.
        cy.window().then(($winObj) => {
            cy.stub($winObj, 'prompt').returns('Hi, I tested')
            //cy.wait(5000);
            cy.get('#promtButton').click();
            cy.get('#promptResult').should('have.text', 'You entered Hi, I tested');
        })
        
    })
})

