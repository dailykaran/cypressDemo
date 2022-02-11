//// <reference types="cypress" />

describe('Hook in FirstSuite', function() {
    before(function() {

       cy.log("Before hook")
    })
    after(function() {

       cy.log("After hook")
    })
    beforeEach(function() {

       cy.log("BeforeEach hook")
    })
    afterEach(function() {

       cy.log("AfterEac hook")
    })
    it('First Test', function() {
       expect(true).to.be.true
       cy.log("First Test")
    })
    it('Second Test', function() {
        expect(1).to.equal(1);
        cy.log("Second Test")
    })

    it.skip('Skip tag Test', function() {
        cy.log("Skip tag Test")
    })

    it('Third Test Smoke and BVT',  { tags: ['@Smoke', '@BVT'] }, function() {
        expect(1).to.equal(1);
        cy.log("Second Test")
    })

    it('Build Test', { tags: ['@Release'] }, function() {
        expect('I am testing build vrification test').to.contains('build');
        cy.log("Second Test")
    })

    it('QA version Test', function() {
        expect('I am testing QA version').to.contains('QA');
        cy.log("Second Test QA")
    })

    it('Sprint and Dev',  { tags: ['@Development'] }, function() {
        expect(1).to.equal(1);
        cy.log("Second Test dev")
    })

    it('Test Dev and older',  { tags: ['@CI', '@older'] }, function() {
        expect(1).to.equal(1);
        cy.log("Second Test older")
    })





 })
