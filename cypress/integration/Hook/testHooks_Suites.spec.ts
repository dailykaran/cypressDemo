
/*
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
*/

describe('QA', { tags: ['@Dev', '@Live'] }, function() {

    it('First Test',  function() {
       expect(true).to.be.true
       cy.log("First Test")
    })
    it('Second Test', function() {
        expect(1).to.equal(1);
        cy.log("Second Test")
    })

});

describe('Smoke', { tags: ['@Smoke', '@QA'] }, function() {

    it('First2 Test2',  function() {
       expect(true).to.be.true
       cy.log("First Test")
    })
    it('Second2 Test2', function() {
        expect(1).to.equal(1);
        cy.log("Second Test")
    })

});

describe('Release', { tags: ['@Rel', '@Local'] }, function() {

   it('First2 Test2',  function() {
      expect(true).to.be.true
      cy.log("First Test")
   })
   it('Second2 Test2', function() {
       expect(1).to.equal(1);
       cy.log("Second Test")
   })

});

describe('Release2', { tags: ['@test', '@CI'] }, function() {

   it('First2 Test2',  function() {
      expect(true).to.be.true
      cy.log("First Test")
   })
   it('Second2 Test2', function() {
       expect(1).to.equal(1);
       cy.log("Second Test")
   })

});
