

describe('Elements Handles', function() {

    afterEach( function() {
        console.log("[AFTER:currentTest.title]", this.currentTest.title);
		console.log("[AFTER:currentTest.fullTitle()]", this.currentTest.fullTitle());
		console.log("[AFTER:currentTest.state]", this.currentTest.state);
    })
    it('Text Box', () => {
        cy.visit('https://demoqa.com/text-box');
        cy.url().should('include', 'text-box');

        cy.get('#userName').type('Testing QA');
        cy.get('input#userName').invoke('val').should('not.be.empty')
        cy.get('#userEmail').type('QA123@example.in');
        cy.get('input#userEmail').invoke('val').then((txt) => { expect(txt).to.contain('QA123@example.in') });
        cy.get('#currentAddress').type('41, software campus');
        cy.get('textarea#currentAddress').should('have.value', '41, software campus');
        cy.get('#permanentAddress').type('41, software campus');
        cy.get('#submit').should('be.visible').click();
    })

    it("test text box by xpath", () => {
        cy.visit('https://demoqa.com/text-box');
        cy.url().should('include', 'text-box');

        cy.xpath('//input[@id="userName"]').type('QA123')
        cy.xpath('//input[@id="userEmail"]').type('QA123@example.in').invoke('val').should('contain', '@');
        cy.xpath('//textarea[@id="currentAddress"]').type('41, software campus').should('have.value', '41, software campus');
        cy.xpath('//textarea[@id="permanentAddress"]').type('software campus').invoke('val').should('not.be.empty');
        cy.xpath('//button[@id="submit"]').click();

    })

    it("custom commands", () => {
        cy.visit('https://demoqa.com/text-box');
        cy.url().should('include', 'text-box');
        cy.type_assert_NotEmpty('//input[@id="userName"]', 'QA');
        
    })
})
