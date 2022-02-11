//// <reference types="cypress" />

describe('Hook Testcasegrep', function() {

    it('FirstTest', function() {
       expect(true).to.be.true
       cy.log("First Test")
    })
    it('Second Test', function() {
        expect(1).to.equal(1);
        cy.log("Second Test")
    })

    it('Skip tag Test', function() {
        cy.log("Skip tag Test")
    })
})

describe('Hook in testsuitegrep', function() {

    it('FirstTest', function() {
       expect(true).to.be.true
       cy.log("First Test")
    })
    it('Second Test', function() {
        expect(1).to.equal(1);
        cy.log("Second Test")
    })

    it('tag Test', function() {
        cy.log("Skip tag Test")
    })
})