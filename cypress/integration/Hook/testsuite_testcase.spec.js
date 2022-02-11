/// <reference types="cypress" />

describe.only('Test Suite First 1', () => {

    before(function() {
        cy.log("Before hook");
    })
    after(function() {
        cy.log("After hook");
    })
    beforeEach(function() {
        cy.log("BeforeEach hook");
    })
    afterEach(function() {
        cy.log("AfterEach hook");
    })

    it('Test case First 1', function() {
        cy.log("testcase first 1");
    })

    it('Test case Second 2', function() {
        cy.log("testcase Second 2");
    })

    it.skip('Test case Three 3', function() {
        cy.log("testcase Second 3");
    })
})

describe('Test Suite second 2', () => {

    before(function() {
        cy.log("Before hook2");
    })
    after(function() {
        cy.log("After hook2");
    })
    beforeEach(function() {
        cy.log("BeforeEach hook2");
    })
    afterEach(function() {
        cy.log("AfterEach hook2");
    })

    it('TestSuite 2:Test case First 1', function() {
        cy.log("testcase first 1");
    })

    it('TestSuite 2:Test case second 2', function() {
        cy.log("testcase Second 2");
    })

    it('TestSuite 2:Test case three 3', function() {
        cy.log("testcase Three 3");
    })

        describe('Nested Testsuite 1', function() {
            it('Nested Testsuite 1:Test case First 1', function() {
                cy.log("testcase first 1");
            })
        
            it('Nested Testsuite 1:Test case First 2', function() {
                cy.log("testcase Second 2");
            })

            it.only('Nested Testsuite 1:Test case First 3', function() {
                cy.log("testcase Three 3");
            })
        })
})



