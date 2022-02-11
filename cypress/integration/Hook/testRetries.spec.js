describe('Assertion, retries in test suite and test case/ Handle Uncaught', function() {
    
    it('assertion of Google URL using location',  () => {

        cy.visit('https://www.google.co.in');
        cy.url().should('equal', 'https://www.google.co.in/');
        cy.get('input[title="Search"]').type('I am testing the QA version...').type('{enter}');

        cy.location().should((location) => {
            expect(location.host).to.eq('www.google.co.in')
            expect(location.hostname).to.eq('www.google.co.in')
            expect(location.protocol).to.eq('https:')
        })
    })

    // amazon is block
    it.skip('assertion of amazon URL using location and handle retries', () => {
        // reties is add in the cypress.json configuration. { retries: 4 }
        // https://docs.cypress.io/guides/guides/test-retries#Configure-Test-Retries 
        

        cy.on('uncaught:exception', (e, runnable ) => {
            console.log(e + " ### " + runnable)
            if (e.message.includes('function')) {
                return false
            }
        })

        cy.visit('https://www.amazon.in');
        cy.url().should('contain', 'amazon');

        cy.get('[href$="bestsellers"]').click();
        cy.location().should((loc) => {
            expect(loc.pathname).to.eq('/gp/bestsellers/')
            expect(loc.search).to.eq('?ref_=nav_cs_bestsellers')
        })
    });

    it('Handle to test console appears when navigating new URL',  { retries: 2 }, () => {
        //it.only('assertion of amazon URL using location and handle retries', { retries: 3 }, () => {
            // cy objects are standard Node event emitters. 
            //That means you can use "on" methods to bind and unbind from events.
            cy.on('uncaught:exception', (e, runnable ) => {
                //console.log(e + " ### " + runnable)
                if (e.message.includes('enable_page_level_ads')) {
                    return false
                    }
            })
            
            cy.visit('https://www.globalsqa.com/demo-site/draganddrop/');
            cy.url().should('contain', 'draganddrop');
    });

})

